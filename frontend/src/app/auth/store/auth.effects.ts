import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AdminAuth } from './../../shared/models/admin-auth';
import { AuthService } from '../../core/services/auth.service';

import * as AuthActions from './auth.actions';
import * as AdminActions from './../../core/store/admin/admin.actions';
import * as UserActions from './../../core/store/user/user.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  @Effect()
  adminSignup = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.TryCreateAdmin),
    map((action: AuthActions.TryCreateAdmin) => {
      return action.payload;
    }),
    switchMap((adminAuthData: AdminAuth) => {
      return this.authService.createAdmin(adminAuthData);
    }),
    mergeMap(res => {
      console.log('kkkkrgeg');
      console.log(res);
      this.router.navigate(['/admin-panel']);
      return [
        {
          type: AuthActions.ActionTypes.Signup
        },
        {
          type: AuthActions.ActionTypes.SetToken,
          payload: res.jwtToken
        },
        {
          type: AuthActions.ActionTypes.SetTokenExpiry,
          payload: res.expiresIn
        },
        {
          type: AdminActions.ActionTypes.SetAdminId,
          payload: res.userId
        }
      ];
    })
  );

  @Effect()
  userSignup = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.TryCreateUser),
    map((action: AuthActions.TryCreateUser) => {
      return action.payload;
    }),
    switchMap(userAuthData => {
      return this.authService.createUser(userAuthData);
    }),
    mergeMap(res => {
      console.log('gbbbvgerve');
      console.log(res);
      this.router.navigate(['/client-panel']);
      return [
        {
          type: AuthActions.ActionTypes.Signup
        },
        {
          type: AuthActions.ActionTypes.SetToken,
          payload: res.jwtToken
        },
        {
          type: AuthActions.ActionTypes.SetTokenExpiry,
          payload: res.expiresIn
        },
        {
          type: UserActions.ActionTypes.SetUserId,
          payload: res.userId
        }
      ];
    })
  );

  @Effect()
  login = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.TryLogin),
    map((action: AuthActions.TryLogin) => {
      return action.payload;
    }),
    switchMap(loginData => {
      return this.authService.loginUser(loginData);
    }),
    mergeMap(res => {

      const actions = [
        {
          type: AuthActions.ActionTypes.Login
        },
        {
          type: AuthActions.ActionTypes.SetToken,
          payload: res.jwtToken
        },
        {
          type: AuthActions.ActionTypes.SetTokenExpiry,
          payload: res.expiresIn
        }
      ];
      if (res.usertype === 'Admin') {
        this.router.navigate(['/admin-panel']);

        return [...actions, {type: AdminActions.ActionTypes.SetAdminId, payload: res.userId} as Action];
      } else {
        this.router.navigate(['/client-panel']);

        return [...actions, {type: UserActions.ActionTypes.SetUserId, payload: res.userId} as Action];
    }})
  );

  BACKEND_URL = environment.apiUrl;

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
