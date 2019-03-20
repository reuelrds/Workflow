import { adminReducer } from './admin.reducers';
import * as AdminActions from './admin.actions';
import { User } from 'src/app/shared/models/user';

const initialState = {
  id: null,
  users: []
};

describe('Testing Admin Reducer', () => {

  it('should set admin id', () => {
    expect(adminReducer(
      initialState,
      {
        type: AdminActions.ActionTypes.SetAdminId,
        payload: 'Admin01'
      }
    )).toEqual({
      ...initialState,
      id: 'Admin01'
    });
  });
});
