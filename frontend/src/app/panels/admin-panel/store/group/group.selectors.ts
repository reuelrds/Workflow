import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromGroup from './group.reducers';
import * as fromAdminPanel from './../admin-panel.reducers';
import * as fromUserSelector from './../users/user.selectors';
import { Group } from 'src/app/shared/models/group';
import { User } from 'src/app/shared/models/user';


export const getGroupState = createFeatureSelector<
  fromAdminPanel.State,
  fromAdminPanel.AdminPanelState
>('adminpanel');

export const getGroupEntitiesState = createSelector(
  getGroupState,
  state => state.group
);

export const {
  selectIds: getGroupIds,
  selectEntities: getGroupEntities,
  selectAll,
  selectTotal: getTotalGroups
} = fromGroup.adapter.getSelectors(getGroupEntitiesState);

const allUsers = (state: fromAdminPanel.AdminPanelState) => state.user;

export const getAllGroups = createSelector(
  selectAll,
  fromUserSelector.getUserEntities,
  (groupEntities: Group[], userEntities) => {
    if (groupEntities && userEntities) {
      groupEntities.forEach(group => {
        if (Object.keys(userEntities).length > 0) {

          group.staffCount = 0;
          Object.values(userEntities).forEach(user => {
            if (user.groupId === group.id) {
              group.staffCount++;
            }
          });
        }
      });
      return groupEntities;
    } else {
      return groupEntities;
    }
  }
);
