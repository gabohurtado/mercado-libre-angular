import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/internal/operators';

import baseUrl from '../config/config';
import { ResultModel } from '../models/ResultModel';
import { ResultItemModel } from '../models/ResultItemModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  fetchProducts = (criteria) => {
    console.log('Service', criteria);

    const url = `${baseUrl.url_products}/search?q=${criteria}`;
    console.log(url);

    return this.http.get<ResultModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError(this.handleError)
    );
  }

  getProductById = id => {
    const url = `${baseUrl.url_products}/${id}`;
    console.log(url);

    return this.http.get<ResultItemModel>(url).pipe(
      tap(_ => console.log(`Fetching products`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
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
