import { Action } from '@ngrx/store';

export enum ProductsActionTypes {
  FetchProducts = '[Products] Fetch Products',
  ErrorFetchingProducts = '[Products] Error Fetching Products',
  ShowDetails = '[Products] Show Details',
  ErrorShowingDetails = '[Products] Error Showing Details',
  SetPathFromRoot = '[Products] Set Path From Root',
  ErrorSetPathFromRoot = '[Products] Error Set Path From Root',
  CleanPathFromRoot = '[Products] Clean Path From Root',
}

export class FetchProducts implements Action {
  readonly type = ProductsActionTypes.FetchProducts;
  constructor(public payload: any) {}
}

export class ErrorFetchingProducts implements Action {
  readonly type = ProductsActionTypes.ErrorFetchingProducts;
  constructor(public payload: string) {}
}

export class ShowDetails implements Action {
  readonly type = ProductsActionTypes.ShowDetails;
  constructor(public payload: any) {}
}

export class ErrorShowingDetails implements Action {
  readonly type = ProductsActionTypes.ErrorShowingDetails;
  constructor(public payload: string) {}
}

export class SetPathFromRoot implements Action {
  readonly type = ProductsActionTypes.SetPathFromRoot;
  constructor(public payload: string[]) {}
}

export class ErrorSetPathFromRoot implements Action {
  readonly type = ProductsActionTypes.ErrorSetPathFromRoot;
  constructor(public payload: string) {}
}

export class CleanPathFromRoot implements Action {
  readonly type = ProductsActionTypes.CleanPathFromRoot;
}

export type ProductsActions = FetchProducts
| ErrorFetchingProducts
| ShowDetails
| ErrorShowingDetails
| SetPathFromRoot
| ErrorSetPathFromRoot
| CleanPathFromRoot;
