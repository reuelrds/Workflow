import { userReducer } from './user.reducers';
import * as UserActions from './user.actions';

const initialState = {
  id: null
};

describe('Testing User Reducer', () => {

  it('should set user id', () => {
    expect(userReducer(
      initialState,
      {
        type: UserActions.ActionTypes.SetUserId,
        payload: 'User01'
      }
    )).toEqual({
      ...initialState,
      id: 'User01'
    });
  });
});
