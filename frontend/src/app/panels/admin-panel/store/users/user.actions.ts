import { Action } from '@ngrx/store';

import { User } from 'src/app/shared/models/user';

export enum ActionTypes {

  TryAddUser = '[Add User Dialog] Try Add User',
  AddUser = '[Add User API] Add User',
  TryGetUsers = '[User Management Dialog] Try Get Users',
  GetUsers = '[User API] Get Users'
}

export class AddUser implements Action {
  readonly type = ActionTypes.AddUser;

  constructor(public payload: User ) {}
}

export class TryAddUser implements Action {
  readonly type = ActionTypes.TryAddUser;

  constructor(public payload: {
    firstName: string,
    lastName: string,
    email: string
  }) {}
}

export class TryGetUsers implements Action {
  readonly type = ActionTypes.TryGetUsers;
}

export class GetUsers implements Action {
  readonly type = ActionTypes.GetUsers;

  constructor(public payload: User[]) {}
}


export type UserActions = AddUser | TryAddUser | TryGetUsers | GetUsers;
