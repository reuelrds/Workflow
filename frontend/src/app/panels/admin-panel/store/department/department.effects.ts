import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AdminService } from 'src/app/core/services/admin.service';

import * as DepartmentActions from './department.action';
import { switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class DepartmentEffects {

  @Effect()
  getDepartments = this.actions$.pipe(
    ofType(DepartmentActions.ActionTypes.TryGetDepartments),
    switchMap(() => this.adminService.getDepartments()),
    mergeMap(res => {
      return [{type: DepartmentActions.ActionTypes.GetDepartments, payload: res.departments}];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
