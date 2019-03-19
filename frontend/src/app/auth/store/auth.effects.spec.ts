import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthEffects } from './auth.effects';
import { ReplaySubject, of, Observable } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { hot, cold, getTestScheduler } from 'jasmine-marbles';

import { AuthService } from '../../core/services/auth.service';

import * as AuthActions from './auth.actions';
import * as AdminActions from './../../panels/admin-panel/store/admin/admin.actions';
import * as UserActions from './../../panels/client-panel/store/user/user.actions';

class RouterStub {
  navigate(params) {}
}

class AuthServiceStub {

  userType = 'Admin';

  setUserType(userType) {
    this.userType = userType;
  }

  createAdmin(params) {
    return of({
      jwtToken: 'testToken',
      expiresIn: 3600,
      userId: 'Admin01',
      usertype: 'Admin'
    });
  }

  createUser(params) {
    return of({
      jwtToken: 'testToken',
      expiresIn: 3600,
      userId: 'User01',
      usertype: 'User'
    });
  }

  loginUser(params) {
    return (this.userType === 'Admin') ?
      of({
        jwtToken: 'testToken',
        expiresIn: 3600,
        userId: 'Admin01',
        usertype: 'Admin'
      }) :
      of({
        jwtToken: 'testToken',
        expiresIn: 3600,
        userId: 'User01',
        usertype: 'User'
      });
  }
}

describe('Testing Auth Effects', () => {

  let actions: Observable<any>;
  let effects: AuthEffects;
  let router: RouterStub;
  let authService: AuthServiceStub;
  let routerSpy: any;
  let createAdminSpy: any;
  let createUserSpy: any;
  let loginSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        provideMockActions(() => actions),
        provideMockStore({}),
        {provide: Router, useClass: RouterStub}
      ]
    });

    effects = TestBed.get(AuthEffects);
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);

    routerSpy = spyOn(router, 'navigate').and.callThrough();
    createAdminSpy = spyOn(authService, 'createAdmin').and.callThrough();
    createUserSpy = spyOn(authService, 'createUser').and.callThrough();
    loginSpy = spyOn(authService, 'loginUser').and.callThrough();
    // authSpy = jasmine.createSpyObj('AuthServiceStub', ['createAdmin', 'createUser']);
  });

  it('should successfully create admin', () => {
    const data = {companyName: 'jasmine', email: 'jasmimne@email.com', password: 'passwd'};
    const action = {type: AuthActions.ActionTypes.TryCreateAdmin, payload: data};
    const completion = [
      {
        type: AuthActions.ActionTypes.Signup
      },
      {
        type: AuthActions.ActionTypes.SetToken,
        payload: 'testToken'
      },
      {
        type: AuthActions.ActionTypes.SetTokenExpiry,
        payload: 3600
      },
      {
        type: AdminActions.ActionTypes.SetAdminId,
        payload: 'Admin01'
      }
    ];

    const schedular = getTestScheduler();

    schedular.run(helpers => {
      const {expectObservable} = helpers;

      actions = hot('--a-', {a: action});
      const expected = '-- 500ms (bcde)';
      const marb =  {
        b: completion[0],
        c: completion[1],
        d: completion[2],
        e: completion[3]
      };
      expectObservable(effects.adminSignup).toBe(expected, marb);
    });
    expect(createAdminSpy).toHaveBeenCalledWith(data);
    expect(routerSpy).toHaveBeenCalledWith(['/admin-panel']);


  });

  it('should successfully create a user', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      password: 'passwd',
      token: 'testToken'
    };
    const action = {type: AuthActions.ActionTypes.TryCreateUser, payload: data};
    const completion = [
      {
        type: AuthActions.ActionTypes.Signup
      },
      {
        type: AuthActions.ActionTypes.SetToken,
        payload: 'testToken'
      },
      {
        type: AuthActions.ActionTypes.SetTokenExpiry,
        payload: 3600
      },
      {
        type: UserActions.ActionTypes.SetUserId,
        payload: 'User01'
      }
    ];

    const schedular = getTestScheduler();

    schedular.run(helpers => {
      const {expectObservable} = helpers;

      actions = hot('--a-', {a: action});
      const expected = '-- 500ms (bcde)';
      const marb =  {
        b: completion[0],
        c: completion[1],
        d: completion[2],
        e: completion[3]
      };
      expectObservable(effects.userSignup).toBe(expected, marb);
    });

    expect(routerSpy).toHaveBeenCalledWith(['/client-panel']);
    expect(createUserSpy).toHaveBeenCalledWith(data);
  });

  it('should login admin', () => {
    const data = {
      email: 'john.doe@email.com',
      password: 'passwd'
    };
    const action = {type: AuthActions.ActionTypes.TryLogin, payload: data};
    const completion = [
      {
        type: AuthActions.ActionTypes.Login
      },
      {
        type: AuthActions.ActionTypes.SetToken,
        payload: 'testToken'
      },
      {
        type: AuthActions.ActionTypes.SetTokenExpiry,
        payload: 3600
      },
      { type: AdminActions.ActionTypes.SetAdminId,
        payload: 'Admin01'
      }
    ];
    authService.setUserType('Admin');

    const schedular = getTestScheduler();

    schedular.run(helpers => {
      const {expectObservable} = helpers;

      actions = hot('--a-', {a: action});
      const expected = '-- 500ms (bcde)';
      const marb =  {
        b: completion[0],
        c: completion[1],
        d: completion[2],
        e: completion[3]
      };
      expectObservable(effects.login).toBe(expected, marb);
    });

    expect(routerSpy).toHaveBeenCalledWith(['/admin-panel']);
    expect(loginSpy).toHaveBeenCalledWith(data);

  });

  it('should login user', () => {
    const data = {
      email: 'john.doe@email.com',
      password: 'passwd'
    };
    const action = {type: AuthActions.ActionTypes.TryLogin, payload: data};
    const completion = [
      {
        type: AuthActions.ActionTypes.Login
      },
      {
        type: AuthActions.ActionTypes.SetToken,
        payload: 'testToken'
      },
      {
        type: AuthActions.ActionTypes.SetTokenExpiry,
        payload: 3600
      },
      { type: UserActions.ActionTypes.SetUserId,
        payload: 'User01'
      }
    ];
    authService.setUserType('User');

    const schedular = getTestScheduler();

    schedular.run(helpers => {
      const {expectObservable} = helpers;

      actions = hot('--a-', {a: action});
      const expected = '-- 500ms (bcde)';
      const marb =  {
        b: completion[0],
        c: completion[1],
        d: completion[2],
        e: completion[3]
      };
      expectObservable(effects.login).toBe(expected, marb);
    });

    expect(routerSpy).toHaveBeenCalledWith(['/client-panel']);
    expect(loginSpy).toHaveBeenCalledWith(data);

  });
});
