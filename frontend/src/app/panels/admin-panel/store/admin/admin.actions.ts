import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetAdminId = '[Auth API] Set Admin Id'
}

export class SetAdminId implements Action {
  readonly type = ActionTypes.SetAdminId;

  constructor(public payload: string) {}
}

export type AdminActions = SetAdminId;
