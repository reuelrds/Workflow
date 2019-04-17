import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.reducers';


const initialState = {
  token: null,
  tokenExpiry: null,
  isAuthenticated: false
};

describe('Testing Auth Reducers', () => {

  it('should set isAuthenticated to True on Login Action', () => {
    expect(fromAuth.authReducer(
      initialState, {
        type: AuthActions.ActionTypes.Login
      }
    )).toEqual({
      ...initialState,
      isAuthenticated: true
    });
  });

  it('should set isAuthenticated to True on Signup Action', () => {
    expect(fromAuth.authReducer(
      initialState, {
        type: AuthActions.ActionTypes.Signup
      }
    )).toEqual({
      ...initialState,
      isAuthenticated: true
    });
  });

  it('should reset state on Logout action', () => {
    const state = {
      token: 'testToken',
      tokenExpiry: 86400,
      isAuthenticated: true
    };
    expect(fromAuth.authReducer(
      state, {
        type: AuthActions.ActionTypes.Logout
      }
    )).toEqual(initialState);
  });

  it('should set token', () => {
    expect(fromAuth.authReducer(
      initialState, {
        type: AuthActions.ActionTypes.SetToken,
        payload: 'testToken'
      }
    )).toEqual({
      ...initialState,
      token: 'testToken'
    });
  });

  it('should set token expiry', () => {
    expect(fromAuth.authReducer(
      initialState, {
        type: AuthActions.ActionTypes.SetTokenExpiry,
        payload: 86400
      }
    )).toEqual({
      ...initialState,
      tokenExpiry: 86400
    });
  });

});
