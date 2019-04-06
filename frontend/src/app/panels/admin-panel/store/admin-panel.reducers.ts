
import { ActionReducerMap } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromAdmin from './admin/admin.reducers';
import * as fromUser from './users/user.reducers';
import * as fromDepartment from './department/department.reducers';

export interface AdminPanelState {
  admin: fromAdmin.State;
  user: fromUser.State;
  department: fromDepartment.State;
}

export interface State extends fromApp.AppState {
  adminpanel: AdminPanelState;
}

export const reducers: ActionReducerMap<AdminPanelState> = {
  admin: fromAdmin.adminReducer,
  user: fromUser.userReducer,
  department: fromDepartment.departmentReducer
};
