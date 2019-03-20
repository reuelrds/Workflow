import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import { AdminService } from '../../../../core/services/admin.service';

import * as UserActions from './user.actions';
import { Action } from '@ngrx/store';

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

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
