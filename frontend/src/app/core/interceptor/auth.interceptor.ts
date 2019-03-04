import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';
import * as fromApp from './../../store/app.reducers';
import * as fromAuth from './../../auth/store/auth.reducers';


/**
 * Auth Interceptor intercepts all outgoing requests and adds a JWT Token as a Header Field
 *
 * This helps the server authenticate whether the user's request is valid.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


 /**
  * Injecting required services
  * @param authService Provides the JWT token received from the server on Successfull login
  */
  constructor(private store: Store<fromApp.AppState>) {}

  /**
   * intercept method provided by HttpInterceptor that allows to intercept outgoing requests
   *
   * @param req HTTP Request object
   * @param next used to dispatch request to next handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // get the token from auth store
    return this.store.select('auth').pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {


        // Clone the request and set Authorization header with JWT token
        // Note: Requests are cloned because directly editing them may cause some internal errors
        //      Because the way that Angular handles requests internally

        const authRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authState.token)
        });
        return next.handle(authRequest);
      })
    );
  }
}
