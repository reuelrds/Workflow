import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  tokenExpiry: number;
  isAuthenticated: boolean;
}

const initialState: State = {
  token: null,
  tokenExpiry: null,
  isAuthenticated: false
};


export function authReducer(state = initialState, action: AuthActions.AuthActions) {

  switch (action.type) {
    case AuthActions.ActionTypes.Login:
    case AuthActions.ActionTypes.Signup:
      return {
        ...state,
        isAuthenticated: true
      };
    case AuthActions.ActionTypes.Logout:
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    case AuthActions.ActionTypes.SetToken:
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.ActionTypes.SetTokenExpiry:
      return {
        ...state,
        tokenExpiry: action.payload
      };
    default:
      return state;
  }
}
