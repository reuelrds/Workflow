import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, pipe, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminAuth } from '../../shared/models/admin-auth';
import { LoginData } from '../../shared/models/login-data';
import { environment } from './../../../environments/environment';

/**
 * Handles all Authentication, Sigining up & Logging in, Logic
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
   * @param {string} token Stores the JWT Token received from the server on successfull login
   */
  private token: string;

  /**
   * @param {string} tokenTimer Stores the expiration value of the JWT Token in seconds
   */
  private tokenTimer: any;

  /**
   * @param {boolean} isAuthenticated Stores whether the user is Authenticated or not.
   *
   * Note:  This property is used along with the `getIsAuth` method to notify subscribing components
   *        the authentication status. This is required as some components may get instantiated later and may
   *        miss the value that the `authStatusListener` emitts.
   */
  private isAuthenticated = false;

  /**
   * @param {Subject<boolean>} authStatusListener Emitts events specifying authentication status to which components can subscribe to.
   */
  private authStatusListener: Subject<boolean> = new Subject<boolean>();

  /**
   * @param {BehaviourSubject<string>} userIdListener Emitts events specifying userid to which components can subscribe to.
   */
  private userIdListener: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Injecting required Services
   *
   * @param httpClient Used for HTTP requests.
   * @param router Used to navigate to different URL's.
   */
  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * Getter that returns the token
   * @returns {string} The JWT Token provided by the server
   */
  getToken() {
    return this.token;
  }

  /**
   * Getter that returns the token
   * @returns {string} The JWT Token provided by the server
   */
  getIsAuth() {
    return this.isAuthenticated;
  }

  /**
   * Emitts True or False based on whether the user is Authenticated or not
   * @returns {Observable<boolean>} Returns an Observable of type boolean that components can subscribe to
   */
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  /**
   * Emitts Logged in User's id
   * @returns {Observable<string>} Returns an Observable of type boolean that components can subscribe to
   */
  getUserIdListener() {
    return this.userIdListener.asObservable();
  }

  /**
   * Tries to Create a new Admin Account
   *
   * @param companyName Organization Name
   * @param email Admin email
   * @param password Admin password
   */
  createAdmin(companyName: string, email: string, password: string): Observable<{message: string}> {

    // Check if form inputs are not null or undefined
    if (!companyName || !email || !password) {
      throw new Error('Invalid Form Inputs');
    }

    // Create an admin object.
    // An Object is created and sent instead of individual values as extracting these values will be easier on the backend
    const adminAuthData: AdminAuth = {
      companyName,
      email,
      password
    };

    // Sending data to backend using POST method
    // This will return an observable to which we subscribe to get the data.
    return this.httpClient
      .post<{ message: string }>(
        `${this.BACKEND_URL}/api/auth/admin-signup`,
        adminAuthData
      );
  }

  /**
   * Tries to create a new user account
   *
   * @param {File} image User Profile Picture
   * @param {string} firstName User's First Name
   * @param {string} lastName User's Last Name
   * @param {string} email User's email address
   * @param {string} password Password for user account
   * @param {string} token ID issued to the user's Organizaation
   */
  createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    token: string,
    image?: File
  ): Observable<{message: string}> {

    // Check if form inputs are not null or undefined
    if (!firstName || !lastName || !email || !password || !token) {
      throw new Error('Invalid Form Inputs');
    }

    // We use FormData as JSON format supports only strings and not images
    const userData = new FormData();
    userData.append('img', image, `${firstName}-${lastName}`);
    userData.append('firstName', firstName);
    userData.append('lastName', lastName);
    userData.append('email', email);
    userData.append('password', password);
    userData.append('token', token);

    // Sending data to backend using POST method
    // This will return an observable to which we subscribe to get the data.
    return this.httpClient
      .post<{ message: string }>(
        `${this.BACKEND_URL}/api/auth/user-signup`,
        userData
      );
  }

  /**
   * Tries to login the user
   *
   * @param {string} email User's email
   * @param {string} password User's password
   */
  loginUser(email: string, password: string): Observable<{ jwtToken: string, usertype: string, expiresIn: number, userId: string}> {

    // Check if email and password are not null or undefined
    if (!email || !password) {
      throw new Error('Invalid Credentials');
    }

    const loginData: LoginData = {
      email,
      password
    };

    return this.httpClient.post<{
      jwtToken: string;
      usertype: string;
      expiresIn: number;
      userId: string;
    }>(`${this.BACKEND_URL}/api/auth/login`, loginData).pipe(
      tap(result => {
        this.saveLoginData(result);
        return result;
      })
    );
  }

  /**
   * Saves JWT Token, Authentication status.
   *
   * @param { jwtToken: string, usertype: string, expiresIn: number, userId: string } result The result
   *  object received from the server containing JWT Token, It's expiration duration & User Type
   */
  private saveLoginData(result: {
    jwtToken: string;
    usertype: string;
    expiresIn: number;
    userId: string;
  }) {
    console.log('login Successful');
    console.log(result);

    this.token = result.jwtToken;

    if (result.jwtToken) {
      // If jwt token is present, then the user is Authenticated
      this.isAuthenticated = true;

      // set timer to logout user after the token expires
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, result.expiresIn * 1000);

      // tell the subscribing components that user is authenticated
      this.authStatusListener.next(true);
      console.log('sent dev');
      this.userIdListener.next(result.userId);

      // Save the expiration date to local storage
      const now = new Date();
      const expiration = new Date(now.getTime() + result.expiresIn * 1000);
      this.saveLocalData(this.token, expiration, result.usertype, result.userId);

      // Emitt new userid to subscribers
    }
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
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);
      this.authStatusListener.next(true);
      this.userIdListener.next(authInformation.userId);
      console.log('devid: ' + authInformation.userId);
      if (authInformation.userType === 'User') {
        this.router.navigate(['/client-panel']);
      } else {
        this.router.navigate(['/admin-panel']);
      }
    }
  }

  /**
   * Routine to Logout the user.
   * And also clear out the stored data
   */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearLocalData();
    this.router.navigate(['/']);
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
