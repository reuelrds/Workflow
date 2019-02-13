import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorComponent } from './../../shared/components/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMesage = 'An Unknown Error Occured';
        if (error.error.message) {
          errorMesage = error.error.message;

        }
        // alert(errorMesage);
        this.dialog.open(ErrorComponent, {data: {message: errorMesage}, maxWidth: '500px', minWidth: 'min-content'});
        return throwError(error);
      })
    );
  }
}
