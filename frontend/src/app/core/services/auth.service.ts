import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, Observable, pipe, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminAuth } from '../../shared/models/admin-auth';
import { LoginData } from '../../shared/models/login-data';
import { environment } from './../../../environments/environment';

import * as fromAuth from './../../store/app.reducers';
import * as AuthActions from './../../auth/store/auth.actions';

/**
 * Helps in Handleling all Authentication, Sigining up & Logging in, Logic
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * @param {string} BACKEND_URL URL ponting to the backend server.
   */
  private BACKEND_URL: string = environment.apiUrl;

  /**
   * @param {string} tokenTimer Stores the expiration value of the JWT Token in seconds
   */
  private tokenTimer: any;


  /**
   * Injecting required Services
   *
   * @param httpClient Used for HTTP requests.
   * @param router Used to navigate to different URL's.
   */
  constructor(private httpClient: HttpClient, private router: Router, private store: Store<fromAuth.AppState>) {}


  /**
   * Saves JWT Token, Authentication status.
   *
   * @param { jwtToken: string, usertype: string, expiresIn: number, userId: string } result The result
   *  object received from the server containing JWT Token, It's expiration duration & User Type
   */
  saveLoginData(result: {
    jwtToken: string;
    usertype: string;
    expiresIn: number;
    userId: string;
  }) {

      // set timer to logout user after the token expires
    this.tokenTimer = setTimeout(() => {
      this.store.dispatch({type: AuthActions.ActionTypes.Logout});
    }, result.expiresIn * 1000);


    // Save the expiration date to local storage
    const now = new Date();
    const expiration = new Date(now.getTime() + result.expiresIn * 1000);
    this.saveLocalData(result.jwtToken, expiration, result.usertype, result.userId);

  }

  /**
   * Auto Logs in user if a valid JWT Token is found in the local storage
   */
  autoAuthUser() {
    // Fetch data from local storage
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    // if some information is found, check the expiration date
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    // if the token isn't expired, proceed to login the user
    if (expiresIn > 0) {
      // this.token = authInformation.token;
      // this.isAuthenticated = true;
      this.store.dispatch({type: AuthActions.ActionTypes.SetToken, payload: authInformation.token});
      // this.store.dispatch({type: Auth})
      console.log(`test  ${expiresIn}, type: ${typeof(expiresIn)}`);
      this.store.dispatch({type: AuthActions.ActionTypes.Login});
      this.tokenTimer = setTimeout(() => {
        this.store.dispatch({type: AuthActions.ActionTypes.Logout});
      }, expiresIn);

      if (authInformation.userType === 'User') {
        this.router.navigate(['/client-panel']);
      } else {
        this.router.navigate(['/admin-panel']);
      }
    }
  }

  /**
   * Saves user data to LocalStorage
   *
   * @param {string} jwtToken JWT Token issued by the Server
   * @param {string} expirationDate Token's expiration date
   * @param {string} userType Type of user that is loggedin
   */
  private saveLocalData(
    jwtToken: string,
    expirationDate: Date,
    userType: string,
    userId: string
  ) {
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userType', userType);
    localStorage.setItem('userId', userId);
  }

  /**
   * Clears data from LocalStorage
   */
  private clearLocalData() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
  }

  /**
   * Tries to Fetch data from LocalStorage
   */
  private getAuthData() {
    const token = localStorage.getItem('jwtToken');
    const expirationDate = localStorage.getItem('expiration');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate || !userType || !userId) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userType,
      userId
    };
  }
}
