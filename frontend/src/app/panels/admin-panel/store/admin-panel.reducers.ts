
import * as fromAdmin from './admin/admin.reducers';
import * as fromUser from './users/user.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AdminPanelState {
  admin: fromAdmin.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AdminPanelState> = {
  admin: fromAdmin.adminReducer,
  user: fromUser.userReducer
};
