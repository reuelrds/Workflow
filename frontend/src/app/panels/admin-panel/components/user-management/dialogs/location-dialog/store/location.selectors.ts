import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromLocation from './location.reducers';
import * as fromAdminPanel from '../../../../../store/admin-panel.reducers';
import * as fromUserSelector from '../../user-management-dialog/store/user.selectors';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user';


export const getLocationState = createFeatureSelector<
  fromAdminPanel.State,
  fromAdminPanel.AdminPanelState
>('adminpanel');

export const getLocationEntitiesState = createSelector(
  getLocationState,
  state => state.location
);

export const {
  selectIds: getLocationIds,
  selectEntities: getLocationEntities,
  selectAll: getAllLocations,
  selectTotal: getTotalLocations
} = fromLocation.adapter.getSelectors(getLocationEntitiesState);

const allUsers = (state: fromAdminPanel.AdminPanelState) => state.user;

export const dep = createSelector(
  getAllLocations,
  fromUserSelector.getUserEntities,
  (locationEntities: Location[], userEntities) => {
    if (locationEntities && userEntities) {
      locationEntities.forEach(location => {
        if (Object.keys(userEntities).length > 0) {
          const locationHeadDetails = userEntities[location.locationHead];
          location.locationHeadName = `${locationHeadDetails.firstName} ${locationHeadDetails.lastName}`;

          location.staffCount = 0;
          Object.values(userEntities).forEach(user => {
            if (user.locationId === location.id) {
              console.log('eff');
              location.staffCount++;
            }
          });
        }
      });
      console.log(locationEntities);
      return locationEntities;
    } else {
      return locationEntities;
    }
  }
);
