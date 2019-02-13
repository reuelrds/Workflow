import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}

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
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    }
    console.log(isAuth);
    return isAuth;
  }
}
