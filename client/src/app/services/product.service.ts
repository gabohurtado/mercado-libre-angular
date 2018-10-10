import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient, private store: Store<State>) { }

  fetchProducts = (criteria) => {
    this.store.dispatch(new GeneralsActions.StartLoading);
    console.log('Service', criteria);

    const url = `${baseUrl.url_products}/search?q=${criteria}`;
    console.log(url);

    return this.http.get<ResultModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError(error => {
        this.store.dispatch(new ProductActions.ErrorFetchingProducts(error.message));
        return this.handleError(error);
      })
    ).subscribe(result => {
      this.store.dispatch(new ProductActions.SetPathFromRoot(result.path_from_root));
      this.store.dispatch(new ProductActions.FetchProducts(result));
      this.store.dispatch(new GeneralsActions.EndLoading);
    });
  }

  getProductById = id => {
    this.store.dispatch(new GeneralsActions.StartLoading);
    const url = `${baseUrl.url_products}/${id}`;
    console.log(url);

    return this.http.get<ResultItemModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError( error => {
        this.store.dispatch(new ProductActions.ErrorShowingDetails(error.message));
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
    if (error.status === 401) {
      return throwError('Credenciales incorrectas.');
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    // extender
    return throwError('Error consultando servidor.');
  }

}
