import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
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
    console.log('Service', criteria);

    const url = `${this.baseUrl}/search?q=${criteria}`;
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
    const url = `${this.baseUrl}/${id}`;
    console.log(url);

    return this.http.get<ResultItemModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError<any>(this.handleError('getProduct'))
    ).subscribe(result => {
      this.store.dispatch(new ProductActions.SetPathFromRoot(result.path_from_root));
      this.store.dispatch(new ProductActions.ShowDetails(result));
      this.store.dispatch(new GeneralsActions.EndLoading);
    });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('Erroooooooooooooooooooorrrrr', error);

      this.store.dispatch(new ProductActions.ErrorShowingDetails(error.message));
      this.store.dispatch(new GeneralsActions.EndLoading);

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
