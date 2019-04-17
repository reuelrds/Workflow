import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { AuthService } from './auth.service';

import * as fromAuth from './../../auth/store/auth.reducers';
import * as fromApp from './../../store/app.reducers';
import * as AuthActions from './../../auth/store/auth.actions';
import { HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const initialState: fromAuth.State = {
  isAuthenticated: true,
  token: 'testToken',
  tokenExpiry: 86400
};

const testData = {
  jwtToken: 'testToken',
  usertype: 'Admin',
  expiresIn: 86400,
  userId: 'Admin01'
};

class RouterStub {
  navigate(params) {}
}

describe('Testing Auth Service', () => {
  let authService: AuthService;
  let store: Store<fromAuth.State>;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromApp.reducers,
          feature: combineReducers(fromAuth.authReducer)
        })
      ],
      providers: [
        provideMockStore({ initialState }),
        AuthService,
        {provide: Router, useClass: RouterStub}
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    authService = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  it('should clear state after token expires', fakeAsync(() => {
    spyOn(authService, 'saveLocalData');

    authService.saveLoginData(testData);
    tick(86400 * 1000);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: AuthActions.ActionTypes.Logout
    });
    expect(authService.saveLocalData).toHaveBeenCalled();
  }));

  it('should save Auth Data to local storage & retrieve it', () => {
    authService.saveLoginData(testData);
    const data = {
      token: testData.jwtToken,
      expirationDate: new Date(
        new Date().getTime() + testData.expiresIn * 1000
      ),
      userType: testData.usertype,
      userId: testData.userId
    };
    const storedData = authService.getAuthData();

    expect(storedData.token).toEqual(data.token);
    expect(storedData.userId).toEqual(data.userId);
    expect(storedData.userType).toEqual(data.userType);
    expect(storedData.expirationDate).toBeDefined();
  });

  it('clear local storage', () => {
    authService.clearLocalData();
    const storedData = authService.getAuthData();
    expect(storedData).toBeUndefined();
  });

  describe('Testing Auto Authentication', () => {

    it('should return null if no auth data is retrived from local storage', () => {
      authService.clearLocalData();

      expect(authService.autoAuthUser()).toBeUndefined();
    });

    it('should update the store', fakeAsync(() => {
      authService.saveLoginData(testData);
      const data = authService.getAuthData();

      authService.autoAuthUser();

      const now = new Date();
      const expiresIn = data.expirationDate.getTime() - now.getTime();

      expect(store.dispatch).toHaveBeenCalledTimes(4);

      expect(store.dispatch).toHaveBeenCalledWith({type: AuthActions.ActionTypes.SetToken, payload: 'testToken'});
      expect(store.dispatch).toHaveBeenCalledWith({type: AuthActions.ActionTypes.Login});

      tick(86400 * 1000);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: AuthActions.ActionTypes.Logout
      });
    }));

    it('should navigate admin to admin panel when token hasn\'t expired', () => {
      authService.saveLoginData(testData);
      const router = TestBed.get(Router);
      const spy = spyOn(router, 'navigate');

      authService.autoAuthUser();

      expect(spy).toHaveBeenCalledWith(['/admin-panel']);

    });

    it('should navigate user to user panel when token hasn\'t expired', () => {
      const data = {
        ...testData,
        usertype: 'User'
      };
      authService.saveLoginData(data);
      const router = TestBed.get(Router);
      const spy = spyOn(router, 'navigate');

      authService.autoAuthUser();

      expect(spy).toHaveBeenCalledWith(['/client-panel']);

    });
  });
});
