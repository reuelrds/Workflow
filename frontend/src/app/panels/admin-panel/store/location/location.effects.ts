import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { AdminService } from 'src/app/core/services/admin.service';

import * as LocationActions from './location.action';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { Location } from 'src/app/shared/models/location';
import { Update } from '@ngrx/entity';

@Injectable()
export class LocationEffects {

  @Effect()
  getLocations = this.actions$.pipe(
    ofType(LocationActions.ActionTypes.TryGetLocations),
    switchMap(() => this.adminService.getLocations()),
    mergeMap(res => {
      return [{type: LocationActions.ActionTypes.GetLocations, payload: res.locations}];
    })
  );

  @Effect()
  addLocation = this.actions$.pipe(
    ofType(LocationActions.ActionTypes.TryAddLocation),
    map((action: LocationActions.TryAddLocation) => action.payload),
    switchMap(newLocationData => this.adminService.addNewLocation(newLocationData)),
    mergeMap(result => {
      return [new LocationActions.AddLocation(result.location)];
    })
  );

  @Effect()
  updateLocation = this.actions$.pipe(
    ofType(LocationActions.ActionTypes.TryUpdateLocation),
    map((action: LocationActions.TryAddLocation) => action.payload),
    switchMap(updatedDetails => this.adminService.updateLocation(updatedDetails)),
    mergeMap(result => {
      const updatedLocation: Update<Location> = {
        id: result.location.id,
        changes: {
          locationName: result.location.locationName,
          locationHead: result.location.locationHead
        }
      };
      return [new LocationActions.UpdateLocation(updatedLocation)];
    })
  );

  constructor(
    private actions$: Actions,
    private adminService: AdminService
  ) {}
}
