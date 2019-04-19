import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Group } from 'src/app/shared/models/group';

import * as GroupActions from './group.action';

export interface State extends EntityState<Group> {}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>();

export const initialState: State = adapter.getInitialState();

export function groupReducer(
  state = initialState,
  action: GroupActions.GroupActions): State {

  switch (action.type) {

    case GroupActions.ActionTypes.AddGroup:
      return adapter.addOne(action.payload, state);

    case GroupActions.ActionTypes.GetGroups:
      return adapter.addMany(action.payload, state);

    case GroupActions.ActionTypes.UpdateGroup:
      return adapter.updateOne(action.payload, state);

    default:
      return state;
  }
}
