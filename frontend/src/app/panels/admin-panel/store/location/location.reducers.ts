import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Location } from 'src/app/shared/models/location';

import * as LocationActions from './location.action';

export interface State extends EntityState<Location> {}

export const adapter: EntityAdapter<Location> = createEntityAdapter<Location>();

export const initialState: State = adapter.getInitialState();

export function locationReducer(
  state = initialState,
  action: LocationActions.LocationActions): State {

  switch (action.type) {

    case LocationActions.ActionTypes.AddLocation:
      return adapter.addOne(action.payload, state);

    case LocationActions.ActionTypes.GetLocations:
      return adapter.addMany(action.payload, state);

    case LocationActions.ActionTypes.UpdateLocation:
      return adapter.updateOne(action.payload, state);

    default:
      return state;
  }
}
