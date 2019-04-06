import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromDepartment from './department.reducers';
import * as fromAdminPanel from './../admin-panel.reducers';
import * as fromUserSelector from './../users/user.selectors';
import { Department } from 'src/app/shared/models/department';
import { User } from 'src/app/shared/models/user';


export const getDepartmentState = createFeatureSelector<
  fromAdminPanel.State,
  fromAdminPanel.AdminPanelState
>('adminpanel');

export const getDepartmentEntitiesState = createSelector(
  getDepartmentState,
  state => state.department
);

export const {
  selectIds: getDepartmentIds,
  selectEntities: getDepartmentEntities,
  selectAll: getAllDepartments,
  selectTotal: getTotalDepartments
} = fromDepartment.adapter.getSelectors(getDepartmentEntitiesState);

const allUsers = (state: fromAdminPanel.AdminPanelState) => state.user;

export const dep = createSelector(
  getAllDepartments,
  fromUserSelector.getUserEntities,
  (departmentEntities: Department[], userEntities) => {
    if (departmentEntities && userEntities) {
      departmentEntities.forEach(department => {
        if (Object.keys(userEntities).length > 0) {
          const departmentHeadDetails = userEntities[department.departmentHead];
          department.departmentHeadName = `${departmentHeadDetails.firstName} ${departmentHeadDetails.lastName}`;

          department.staffCount = 0;
          Object.values(userEntities).forEach(user => {
            if (user.departmentId === department.id) {
              console.log('eff');
              department.staffCount++;
            }
          });
        }
      });
      console.log(departmentEntities);
      return departmentEntities;
    } else {
      return departmentEntities;
    }
  }
);
