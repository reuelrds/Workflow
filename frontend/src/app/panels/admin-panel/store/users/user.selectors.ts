
import * as fromUser from './user.reducers';
import * as fromAdminPanel from './../admin-panel.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const getUserState = createFeatureSelector<fromAdminPanel.State, fromAdminPanel.AdminPanelState>('adminpanel');

// export const selectAllUsers = createSelector(
//   getUserState,
//   state => state.user
// );

export const getUserEntitiesState = createSelector(
  getUserState,
  state => state.user
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserEntitiesState);
