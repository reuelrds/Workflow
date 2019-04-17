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
  UpdateManager = '[User API] Update Manager',
  TryUpdateUsersGroup = '[Group Dialog | User Dialog] Try Update User\'s Group',
  UpdateUsersGroup = '[User API] Update User\'s Group',
  TryUpdateUsersDepartment = '[User Dialog] Try Update User\'s Department',
  UpdateUsersDepartment = '[User API] Update User\'s Department',
  TryUpdateUsersLocation = '[User Dialog] Try Update User\'s Location',
  UpdateUsersLocation = '[User API] Update User\'s Location',
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

export class UpdateManager implements Action {
  readonly type = ActionTypes.UpdateManager;

  constructor(public payload: Update<User>) {}
}

export class TryUpdateUsersGroup implements Action {
  readonly type = ActionTypes.TryUpdateUsersGroup;

  constructor(public payload: {userId: string, groupId: string}) {}
}

export class UpdateUsersGroup implements Action {
  readonly type = ActionTypes.UpdateUsersGroup;

  constructor(public payload: Update<User>) {}
}
export class TryUpdateUsersDepartment implements Action {
  readonly type = ActionTypes.TryUpdateUsersDepartment;

  constructor(public payload: {userId: string, departmentId: string}) {}
}

export class UpdateUsersDepartment implements Action {
  readonly type = ActionTypes.UpdateUsersDepartment;

  constructor(public payload: Update<User>) {}
}
export class TryUpdateUsersLocation implements Action {
  readonly type = ActionTypes.TryUpdateUsersLocation;

  constructor(public payload: {userId: string, locationId: string}) {}
}

export class UpdateUsersLocation implements Action {
  readonly type = ActionTypes.UpdateUsersLocation;

  constructor(public payload: Update<User>) {}
}



export type UserActions =
  | AddUser
  | TryAddUser
  | TryGetUsers
  | GetUsers
  | TryUpdateUserManager
  | UpdateUserManager
  | UpdateManager
  | TryUpdateUsersGroup
  | UpdateUsersGroup
  | TryUpdateUsersDepartment
  | UpdateUsersDepartment
  | TryUpdateUsersLocation
  | UpdateUsersLocation;
