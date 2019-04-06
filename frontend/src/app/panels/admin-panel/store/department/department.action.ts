import { Action } from '@ngrx/store';

import { Department } from 'src/app/shared/models/department';

export enum ActionTypes {
  TryAddDepartment = '[Add Department Dialog] Try Add Department',
  AddDepartment = '[Department API] Add Department',
  TryGetDepartments = '[Department Dialog] Try Get Departments',
  GetDepartments = '[Department API] Get Departments',
}

export class AddDepartment implements Action {
  readonly type = ActionTypes.AddDepartment;

  constructor(public payload: Department) {}
}

export class TryAddDepartment implements Action {
  readonly type = ActionTypes.TryAddDepartment;

  constructor(public payload: {
    departmentName: string,
    departmentHead: string
  }) {}
}

export class TryGetDepartments implements Action {
  readonly type = ActionTypes.TryGetDepartments;
}

export class GetDepartments implements Action {
  readonly type = ActionTypes.GetDepartments;

  constructor(public payload: Department[]) {}
}

export type DepartmentActions = AddDepartment | TryAddDepartment | GetDepartments | TryGetDepartments;
