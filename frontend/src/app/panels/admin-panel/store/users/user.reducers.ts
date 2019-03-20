import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user';
import * as UserActions from './user.actions';

export interface State extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({});

export function userReducer(state = initialState, action: UserActions.UserActions): State {
  switch (action.type) {
    case UserActions.ActionTypes.AddUser: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
