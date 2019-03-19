import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import { AdminService } from '../../services/admin.service';

import * as AdminActions from './admin.actions';

@Injectable()
export class AdminEffects {

  @Effect()
  addUser = this.actions$.pipe(
    ofType(AdminActions.ActionTypes.TryAddUser),
    map((action: AdminActions.TryAddUser) => {
      return action.payload;
    }),
    switchMap(userData => {
      return this.adminService.addNewUser(userData);
    }),
    mergeMap(res => {
      return [

      ];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
