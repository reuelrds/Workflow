import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { AdminAuth } from './../../shared/models/admin-auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  adminSignup = this.actions$.pipe(
    ofType(AuthActions.ActionTypes.TryCreateAdmin),
    map((action: AuthActions.TryCreateAdmin) => {
      return action.payload;
    }),
    switchMap((adminAuthData: AdminAuth) => {
      return this.httpClient.post<{ message: string }>(
        `${this.BACKEND_URL}/api/auth/admin-signup`,
        adminAuthData
      );
    }),
    mergeMap(() => {
      this.router.navigate(['/admin-panel']);
      return [
        {
          type: AuthActions.ActionTypes.Signup
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
      const userData = new FormData();
      userData.append('img', userAuthData.image, `${userAuthData.firstName}-${userAuthData.lastName}`);
      userData.append('firstName', userAuthData.firstName);
      userData.append('lastName', userAuthData.lastName);
      userData.append('email', userAuthData.email);
      userData.append('password', userAuthData.password);
      userData.append('token', userAuthData.token);

      return this.httpClient
      .post<{ message: string }>(
        `${this.BACKEND_URL}/api/auth/user-signup`,
        userData
      );
    }),
    mergeMap(() => {
      this.router.navigate(['/client-panel']);
      return [
        {
          type: AuthActions.ActionTypes.Signup
        }
      ];
    })
  );

  BACKEND_URL = environment.apiUrl;

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
