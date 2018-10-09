import { Action } from '@ngrx/store';

export enum ProductsActionTypes {
  LoadProductss = '[Products] Load Productss'
}

export class LoadProductss implements Action {
  readonly type = ProductsActionTypes.LoadProductss;
}

export type ProductsActions = LoadProductss;
