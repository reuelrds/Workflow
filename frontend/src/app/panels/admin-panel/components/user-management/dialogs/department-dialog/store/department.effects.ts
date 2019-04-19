import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AdminService } from 'src/app/core/services/admin.service';

import * as DepartmentActions from './department.action';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Department } from 'src/app/shared/models/department';
import { Update } from '@ngrx/entity';

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

  @Effect()
  addDepartment = this.actions$.pipe(
    ofType(DepartmentActions.ActionTypes.TryAddDepartment),
    map((action: DepartmentActions.TryAddDepartment) => action.payload),
    switchMap(newDepartmentData => this.adminService.addNewDepartment(newDepartmentData)),
    mergeMap(result => {
      return [new DepartmentActions.AddDepartment(result.department)];
    })
  );

  @Effect()
  updateDepartment = this.actions$.pipe(
    ofType(DepartmentActions.ActionTypes.TryUpdateDepartment),
    map((action: DepartmentActions.TryAddDepartment) => action.payload),
    switchMap(updatedDetails => this.adminService.updateDepartment(updatedDetails)),
    mergeMap(result => {
      const updatedDepartment: Update<Department> = {
        id: result.department.id,
        changes: {
          departmentName: result.department.departmentName,
          departmentHead: result.department.departmentHead
        }
      };
      return [new DepartmentActions.UpdateDepartment(updatedDepartment)];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
