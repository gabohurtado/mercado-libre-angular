import { Action } from '@ngrx/store';

export enum GeneralsActionTypes {
  StartLoading = '[Generals] Start Loading',
  EndLoading = '[Generals] End Loading',
}

export class StartLoading implements Action {
  readonly type = GeneralsActionTypes.StartLoading;
}

export class EndLoading implements Action {
  readonly type = GeneralsActionTypes.EndLoading;
}

export type GeneralsActions = StartLoading
| EndLoading;
