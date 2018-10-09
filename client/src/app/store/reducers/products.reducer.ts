import { Action } from '@ngrx/store';
import {
  ProductsActions,
  ProductsActionTypes
} from '../actions/products.actions';

export interface State {
  result: Object;
  item: Object;
  path_from_root: string[];
  error: string;
}

export const initialState: State = {
  result: {},
  item: {},
  path_from_root: [],
  error: ''
};

export function reducer(state = initialState, action: ProductsActions): State {
  switch (action.type) {
    case ProductsActionTypes.FetchProducts:
      return {
        ...state,
        result: action.payload,
        error: ''
      };
    case ProductsActionTypes.ErrorFetchingProducts:
      return {
        ...state,
        error: action.payload
      };
    case ProductsActionTypes.ShowDetails:
      return {
        ...state,
        item: action.payload,
        error: ''
      };
    case ProductsActionTypes.ErrorShowingDetails:
      return {
        ...state,
        error: action.payload
      };
    case ProductsActionTypes.SetPathFromRoot:
      return {
        ...state,
        path_from_root: action.payload,
        error: ''
      };
    case ProductsActionTypes.ErrorSetPathFromRoot:
      return {
        ...state,
        error: action.payload
      };
    case ProductsActionTypes.CleanPathFromRoot:
      return {
        ...state,
        path_from_root: [],
        error: ''
      };
    default:
      return state;
  }
}
