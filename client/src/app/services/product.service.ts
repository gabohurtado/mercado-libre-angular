import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/internal/operators';

import baseUrl from '../config/config';
import { ResultModel } from '../models/ResultModel';
import { ResultItemModel } from '../models/ResultItemModel';

// Redux
import { Store, select } from '@ngrx/store';
import { State } from '../store/reducers/index';
import * as GeneralsActions from '../store/actions/generals.actions';
import * as fromGenerals from '../store/reducers/generals.reducer';
import * as fromProducts from '../store/reducers/products.reducer';
import * as ProductActions from '../store/actions/products.actions';
import { APP_BASE_HREF } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string;


  constructor(private http: HttpClient, private store: Store<State>, @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.baseUrl = `${baseUrl.url_products}`;
  }

  fetchProducts = (criteria) => {
    this.store.dispatch(new GeneralsActions.StartLoading);
    const url = `${this.baseUrl}/search?q=${criteria}`;
    return this.http.get<ResultModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError(error => {
        this.store.dispatch(new ProductActions.ErrorFetchingProducts(`Error consultando el servidor: ${error.message}`));
        return this.handleError(error);
      })
    ).subscribe(result => {
      this.store.dispatch(new ProductActions.FetchProducts(result));
      this.store.dispatch(new ProductActions.SetPathFromRoot(result.path_from_root));
      this.store.dispatch(new GeneralsActions.EndLoading);
    });
  }

  getProductById = id => {
    this.store.dispatch(new GeneralsActions.StartLoading);
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ResultItemModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError(error => {
        this.store.dispatch(new ProductActions.ErrorShowingDetails(`Error consultando el servidor: ${error.message}`));
        return this.handleError(error);
      })
    ).subscribe(result => {
      this.store.dispatch(new ProductActions.SetPathFromRoot(result.path_from_root));
      this.store.dispatch(new ProductActions.ShowDetails(result));
      this.store.dispatch(new GeneralsActions.EndLoading);
    });
  }

  private handleError(error: HttpErrorResponse) {
    this.store.dispatch(new GeneralsActions.EndLoading);
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
    return throwError('Error consultando servidor.');
  }



}
