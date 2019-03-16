import { Action } from '@ngrx/store';

export enum ActionTypes {
  Logout = '[Panel] Logout',
  TryLogin = '[Login Page] Try Login',
  TryCreateUser = '[Signup Page] Try Create User',
  TryCreateAdmin = '[Signup Page] Try Create Admin',
  Login = '[Auth API] Signin',
  Signup = '[Auth API] Signup',
  SetToken = '[Auth API] Set Token',
  SetTokenExpiry = '[Auth API] Set Token Expiry'
}

export class Signup implements Action {
  readonly type = ActionTypes.Signup;
}

export class Login implements Action {
  readonly type = ActionTypes.Login;
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}

export class SetToken implements Action {
  readonly type = ActionTypes.SetToken;

  constructor(public payload: string) {}
}

export class SetTokenExpiry implements Action {
  readonly type = ActionTypes.SetTokenExpiry;

  constructor(public payload: number) {}
}

export class TryCreateAdmin implements Action {
  readonly type = ActionTypes.TryCreateAdmin;

  constructor(public payload: {companyName: string, email: string, password: string}) {}
}

export class TryCreateUser implements Action {
  readonly type = ActionTypes.TryCreateUser;

  constructor(public payload: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string,
    image?: File
  }) {}
}

export class TryLogin implements Action {
  readonly type = ActionTypes.TryLogin;

  constructor(public payload: {email: string, password: string}) {}
}

export type AuthActions = Signup | Login | Logout | SetToken | SetTokenExpiry | TryCreateAdmin | TryCreateUser | TryLogin;
