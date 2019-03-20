import * as fromUser from './user.reducers';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = fromUser.userReducer(fromUser.initialState, action);

      expect(result).toBe(fromUser.initialState);
    });
  });
});
