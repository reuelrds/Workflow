import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { Location } from 'src/app/shared/models/location';

export enum ActionTypes {
  TryAddLocation = '[Location Dialog] Try Add Location',
  AddLocation = '[Location API] Add Location',
  TryGetLocations = '[Location Dialog] Try Get Locations',
  GetLocations = '[Location API] Get Locations',
  TryUpdateLocation = '[Location Dialog] Try Update Location',
  UpdateLocation = '[Location API] Update Location'
}

export class AddLocation implements Action {
  readonly type = ActionTypes.AddLocation;

  constructor(public payload: Location) {}
}

export class TryAddLocation implements Action {
  readonly type = ActionTypes.TryAddLocation;

  constructor(
    public payload: {
      locationName: string;
      locationHead: string;
    }
  ) {}
}

export class TryGetLocations implements Action {
  readonly type = ActionTypes.TryGetLocations;
}

export class GetLocations implements Action {
  readonly type = ActionTypes.GetLocations;

  constructor(public payload: Location[]) {}
}

export class TryUpdateLocation implements Action {
  readonly type = ActionTypes.TryUpdateLocation;

  constructor(
    public payload: {
      location: {
        locationName: string;
        locationHead: string;
        id: string;
      },
      updateField: string;
    }
  ) {}
}

export class UpdateLocation implements Action {
  readonly type = ActionTypes.UpdateLocation;

  constructor(public payload: Update<Location>) {}
}

export type LocationActions =
  | AddLocation
  | TryAddLocation
  | GetLocations
  | TryGetLocations
  | UpdateLocation
  | TryUpdateLocation;
