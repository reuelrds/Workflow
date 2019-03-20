import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';

export enum ActionTypes {
  SetAdminId = '[Auth API] Set Admin Id',
  TryAddUser = '[Add User Dialog] Try Add User',
  AddUser = '[Admin API] Add User'
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

export class AddUser implements Action {
  readonly type = ActionTypes.AddUser;

  constructor(public payload: {user: User}) {}
}

export type AdminActions = SetAdminId | TryAddUser | AddUser;
