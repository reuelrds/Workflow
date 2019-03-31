import { Action } from '@ngrx/store';

import { User } from 'src/app/shared/models/user';
import { Update } from '@ngrx/entity';

export enum ActionTypes {

  TryAddUser = '[Add User Dialog] Try Add User',
  AddUser = '[Add User API] Add User',
  TryGetUsers = '[User Management Dialog] Try Get Users',
  GetUsers = '[User API] Get Users',
  TryUpdateUserManager = '[User Management Dialog] Try Update User Manager',
  UpdateUserManager = '[User API] Update User Manager',
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

export class TryUpdateUserManager implements Action {
  readonly type = ActionTypes.TryUpdateUserManager;

  constructor(public payload: {userId: string, managerId: string}) {}
}
export class UpdateUserManager implements Action {
  readonly type = ActionTypes.UpdateUserManager;

  constructor(public payload: Update<User>) {}
}



export type UserActions = AddUser | TryAddUser | TryGetUsers | GetUsers | TryUpdateUserManager | UpdateUserManager;
