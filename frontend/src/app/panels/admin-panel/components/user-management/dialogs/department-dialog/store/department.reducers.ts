import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Department } from 'src/app/shared/models/department';

import * as DepartmentActions from './department.action';

export interface State extends EntityState<Department> {}

export const adapter: EntityAdapter<Department> = createEntityAdapter<Department>();

export const initialState: State = adapter.getInitialState();

export function departmentReducer(
  state = initialState,
  action: DepartmentActions.DepartmentActions): State {

  switch (action.type) {

    case DepartmentActions.ActionTypes.AddDepartment:
      return adapter.addOne(action.payload, state);

    case DepartmentActions.ActionTypes.GetDepartments:
      return adapter.addMany(action.payload, state);

    case DepartmentActions.ActionTypes.UpdateDepartment:
      return adapter.updateOne(action.payload, state);

    default:
      return state;
  }
}
