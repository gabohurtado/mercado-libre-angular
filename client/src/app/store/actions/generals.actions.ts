import { Action } from '@ngrx/store';

export enum GeneralsActionTypes {
  LoadGeneralss = '[Generals] Load Generalss'
}

export class LoadGeneralss implements Action {
  readonly type = GeneralsActionTypes.LoadGeneralss;
}

export type GeneralsActions = LoadGeneralss;
