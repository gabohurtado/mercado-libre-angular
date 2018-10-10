import { Action } from '@ngrx/store';
import { GeneralsActionTypes, GeneralsActions } from '../actions/generals.actions';


export interface State {
  loading: boolean;
}

export const initialState: State = {
  loading: false,
};

export function reducer(state = initialState, action: GeneralsActions): State {
  switch (action.type) {
    case GeneralsActionTypes.StartLoading:
      return {
        ...state,
        loading: true
      };
    case GeneralsActionTypes.EndLoading:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
}
