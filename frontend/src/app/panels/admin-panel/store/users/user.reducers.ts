import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from 'src/app/shared/models/user';
import * as UserActions from './user.actions';

export interface State extends EntityState<User> {
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const defaultUser = {
  ids: ['123c', '123d'],
  entities: {
    '123c': {
      firstName: 'test23',
      lastName: '43432',
      email: '23@ef.we',
      id: '123c'
    },
    '123d': {
      firstName: 'test23d',
      lastName: '43432d',
      email: '23@ef.wed',
      id: '123d'
    }
  }
};

export const initialState: State = adapter.getInitialState();

export function userReducer(state = initialState, action: UserActions.UserActions): State {
  switch (action.type) {
    case UserActions.ActionTypes.AddUser: {
      return adapter.addOne(action.payload, state);
    }
    case UserActions.ActionTypes.GetUsers: {
      return adapter.addMany(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
