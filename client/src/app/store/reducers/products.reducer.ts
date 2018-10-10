import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProductsActions,
  ProductsActionTypes
} from '../actions/products.actions';
import { ResultModel } from 'src/app/models/ResultModel';
import { PathModel } from '../../models/PathModel';
import { ResultItemModel } from 'src/app/models/ResultItemModel';

export interface State {
  result: ResultModel;
  item: ResultItemModel;
  path_from_root: PathModel[];
  error: string;
}

export const initialState: State = {
  result: null,
  item: null,
  path_from_root: [],
  error: ''
};

export function reducer(state = initialState, action: ProductsActions): State {
  console.log('ProductReducer', action.type);

  switch (action.type) {
    case ProductsActionTypes.FetchProducts:
      console.log('Aqui');

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

export const selectProductState = createFeatureSelector<State>('products');

export const getResult = createSelector(
  selectProductState,
  (state: State) => state.result
);
