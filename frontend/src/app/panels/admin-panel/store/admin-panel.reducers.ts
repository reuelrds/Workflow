
import { ActionReducerMap } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducers';
import * as fromAdmin from './admin/admin.reducers';
import * as fromUser from '../components/user-management/dialogs/user-management-dialog/store/user.reducers';
import * as fromDepartment from '../components/user-management/dialogs/department-dialog/store/department.reducers';
import * as fromLocation from '../components/user-management/dialogs/location-dialog/store/location.reducers';
import * as fromGroup from '../components/user-management/dialogs/group-dialog/store/group.reducers';

export interface AdminPanelState {
  admin: fromAdmin.State;
  user: fromUser.State;
  department: fromDepartment.State;
  location: fromLocation.State;
  group: fromGroup.State;
}

export interface State extends fromApp.AppState {
  adminpanel: AdminPanelState;
}

export const reducers: ActionReducerMap<AdminPanelState> = {
  admin: fromAdmin.adminReducer,
  user: fromUser.userReducer,
  department: fromDepartment.departmentReducer,
  location: fromLocation.locationReducer,
  group: fromGroup.groupReducer
};
