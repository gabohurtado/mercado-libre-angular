import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromProducts from './products.reducer';
import * as fromGenerals from './generals.reducer';

export interface State {

  products: fromProducts.State;
  generals: fromGenerals.State;
}

export const reducers: ActionReducerMap<State> = {

  products: fromProducts.reducer,
  generals: fromGenerals.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
