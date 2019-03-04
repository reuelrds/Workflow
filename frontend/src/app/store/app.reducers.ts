import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './../auth/store/auth.reducers';
import * as fromAdmin from './../core/store/admin/admin.reducers';
import * as fromUser from './../core/store/user/user.reducers';

export interface AppState {
  auth: fromAuth.State;
  admin: fromAdmin.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  admin: fromAdmin.adminReducer,
  user: fromUser.userReducer
};
