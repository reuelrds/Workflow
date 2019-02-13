import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';


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
  constructor(private authService: AuthService) {}

  /**
   * intercept method provided by HttpInterceptor that allows to intercept outgoing requests
   *
   * @param req HTTP Request object
   * @param next used to dispatch request to next handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // get the token from auth service
    const authToken = this.authService.getToken();

    // Clone the request and set Authorization header with JWT token
    // Note: Requests are cloned because directly editing them may cause some internal errors
    //      Because the way that Angular handles requests internally
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    console.log(req);

    // Foward the requet
    return next.handle(authRequest);
  }
}
