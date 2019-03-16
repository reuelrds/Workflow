import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';
import { take, map } from 'rxjs/operators';

/**
 * AuthGuard implements a Guard to test whether a user should be routed foward to the requested URL
 */

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Injecting required Services
   *
   * @param authService Used to verify whether the user is Authenticated or not
   * @param router Used to navigate user back to login page if he isn't authenticated
   */
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  /**
   * Decides if a route can be activated.
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        return authState.isAuthenticated;
      })
    );
  }
}
