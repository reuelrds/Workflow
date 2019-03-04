import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetUserId = '[Signup Page] Set User Id',
}

export class SetUserId implements Action {
  readonly type = ActionTypes.SetUserId;

  constructor(public payload: string) {}
}

export type UserActions = SetUserId;
