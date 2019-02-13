import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * @param {string} BACKEND_URL URL ponting to the backend server.
   */
  private BACKEND_URL: string = environment.apiUrl;

  /**
   * @param {string} userId The Id of the logged in user
   */
  userId: string;

  userData: User;


  /**
   * Injecting required Services
   *
   * @param authService Used to get user's id upon successfull login
   * @param httpClient Used for HTTP requests.
   *
   */
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
  }

  getUserId() {
    this.authService.getUserIdListener().subscribe(result => {
      this.userId = result;
      console.log(this.userId);
    });
  }

  getUserData() {
    if (!this.userId) { this.getUserId(); }

    return this.httpClient
      .get<{ firstName: string; lastName: string; email: string }>(
        `${this.BACKEND_URL}/api/user/${this.userId}`
      )
      .pipe(
        tap(result => {
          console.log('evrgr');
          console.log(result);
          this.userData = result;
          console.log(this.userData.firstName);
        })
      );
  }
}
