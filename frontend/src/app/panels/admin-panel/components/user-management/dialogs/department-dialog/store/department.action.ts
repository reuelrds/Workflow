import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Department } from 'src/app/shared/models/department';

export enum ActionTypes {
  TryAddDepartment = '[Department Dialog] Try Add Department',
  AddDepartment = '[Department API] Add Department',
  TryGetDepartments = '[Department Dialog] Try Get Departments',
  GetDepartments = '[Department API] Get Departments',
  TryUpdateDepartment = '[Department Dialog] Try Update Department',
  UpdateDepartment = '[Department API] Update Department'
}

export class AddDepartment implements Action {
  readonly type = ActionTypes.AddDepartment;

  constructor(public payload: Department) {}
}

export class TryAddDepartment implements Action {
  readonly type = ActionTypes.TryAddDepartment;

  constructor(
    public payload: {
      departmentName: string;
      departmentHead: string;
    }
  ) {}
}

export class TryGetDepartments implements Action {
  readonly type = ActionTypes.TryGetDepartments;
}

export class GetDepartments implements Action {
  readonly type = ActionTypes.GetDepartments;

  constructor(public payload: Department[]) {}
}

export class TryUpdateDepartment implements Action {
  readonly type = ActionTypes.TryUpdateDepartment;

  constructor(
    public payload: {
      department: {
        departmentName: string;
        departmentHead: string;
        id: string;
      },
      updateField: string;
    }
  ) {}
}

export class UpdateDepartment implements Action {
  readonly type = ActionTypes.UpdateDepartment;

  constructor(public payload: Update<Department>) {}
}

export type DepartmentActions =
  | AddDepartment
  | TryAddDepartment
  | GetDepartments
  | TryGetDepartments
  | UpdateDepartment
  | TryUpdateDepartment;
