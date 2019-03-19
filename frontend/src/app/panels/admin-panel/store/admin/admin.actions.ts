import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetAdminId = '[Auth API] Set Admin Id',
  TryAddUser = '[Add User Dialog] Try Add User'
}

export class SetAdminId implements Action {
  readonly type = ActionTypes.SetAdminId;

  constructor(public payload: string) {}
}

export class TryAddUser implements Action {
  readonly type = ActionTypes.TryAddUser;

  constructor(public payload: {
    firstName: string,
    lastName: string,
    email: string
  }) {}
}

export type AdminActions = SetAdminId | TryAddUser;
