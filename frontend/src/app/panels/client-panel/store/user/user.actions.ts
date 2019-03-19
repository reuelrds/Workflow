import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetUserId = '[Auth API] Set User Id'
}

export class SetUserId implements Action {
  readonly type = ActionTypes.SetUserId;

  constructor(public payload: string) {}
}

export type UserActions = SetUserId;
