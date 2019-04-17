import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import { AdminService } from '../../../../core/services/admin.service';

import * as UserActions from './user.actions';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user';

@Injectable()
export class UserEffects {

  @Effect()
  addUser = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryAddUser),
    map((action: UserActions.TryAddUser) => {
      return action.payload;
    }),
    switchMap(userData => {
      return this.adminService.addNewUser(userData);
    }),
    mergeMap(res => {
      console.log(res.user);
      return [{type: UserActions.ActionTypes.AddUser, payload: res.user}];
    })
  );

  @Effect()
  getUsers = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryGetUsers),
    switchMap(() => {
      return this.adminService.getUsers();
    }),
    mergeMap(res => {
      console.log(res.users);
      return [{type: UserActions.ActionTypes.GetUsers, payload: res.users}];
    })
  );

  @Effect()
  updateUserManager = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryUpdateUserManager),
    map((action: UserActions.TryUpdateUserManager) => {
      console.log(action.payload);
      return action.payload;
    }),
    switchMap((payload) => {
      // console.log('erfe', userId);
      // console.log('fwfw', managerId);
      return this.adminService.updateUserManager(payload.userId, payload.managerId);
    }),
    mergeMap(res => {
      const updatedUser: Update<User> = {
        id: res.user.id,
        changes: {
          managerId: res.user.managerId
        }
      };
      const updatedManager: Update<User> = {
        id: res.manager.id,
        changes: {
          isManager: res.manager.isManager
        }
      };
      return [
        {type: UserActions.ActionTypes.UpdateUserManager, payload: updatedUser},
        {type: UserActions.ActionTypes.UpdateManager, payload: updatedManager}
      ];
    })
  );

  @Effect()
  updateUsersGroup = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryUpdateUsersGroup),
    map((action: UserActions.TryUpdateUsersGroup) => {
      console.log(action.payload);
      return action.payload;
    }),
    mergeMap((payload) => {
      return this.adminService.updateUserGroup(payload.userId, payload.groupId);
    }),
    mergeMap(res => {
      const updatedUser: Update<User> = {
        id: res.user.id,
        changes: {
          groupId: res.user.groupId
        }
      };
      return [
        {type: UserActions.ActionTypes.UpdateUsersGroup, payload: updatedUser}
      ];
    })
  );

  @Effect()
  updateUsersDepartment = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryUpdateUsersDepartment),
    map((action: UserActions.TryUpdateUsersDepartment) => {
      console.log(action.payload);
      return action.payload;
    }),
    mergeMap((payload) => {
      return this.adminService.updateUserDepartment(payload.userId, payload.departmentId);
    }),
    mergeMap(res => {
      const updatedUser: Update<User> = {
        id: res.user.id,
        changes: {
          departmentId: res.user.departmentId
        }
      };
      return [
        {type: UserActions.ActionTypes.UpdateUsersDepartment, payload: updatedUser}
      ];
    })
  );

  @Effect()
  updateUsersLocation = this.actions$.pipe(
    ofType(UserActions.ActionTypes.TryUpdateUsersLocation),
    map((action: UserActions.TryUpdateUsersLocation) => {
      console.log(action.payload);
      return action.payload;
    }),
    mergeMap((payload) => {
      return this.adminService.updateUserLocation(payload.userId, payload.locationId);
    }),
    mergeMap(res => {
      const updatedUser: Update<User> = {
        id: res.user.id,
        changes: {
          locationId: res.user.locationId
        }
      };
      return [
        {type: UserActions.ActionTypes.UpdateUsersLocation, payload: updatedUser}
      ];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
