import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../shared/models/admin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /**
   * @param {string} BACKEND_URL URL ponting to the backend server.
   */
  private BACKEND_URL: string = environment.apiUrl;

  /**
   * @param {string} adminId The Id of the logged in user
   */
  adminId: string;

  /**
   * @param {Admin} adminData The Id of the logged in user
   */
  adminData: Admin;

  time;


  /**
   * Injecting required Services
   *
   * @param authService Used to get user's id upon successfull login
   * @param httpClient Used for HTTP requests.
   *
   */
  constructor(private authService: AuthService, private httpClient: HttpClient) {
  }

  getAdminId() {
    // this.authService.getUserIdListener().subscribe(result => {
    //   this.adminId = result;
    //   console.log(this.adminId);
    // });
  }

  getAdminData() {
    if (!this.adminId) {
      this.getAdminId();
    }


    return this.httpClient.get<{name: string, email: string}>(`${this.BACKEND_URL}/api/admin/${this.adminId}`).pipe(tap(result => {

      console.log('evrgr');
      console.log(result);
      this.adminData = result;
      console.log(this.adminData.name);
    }));
  }

  addNewUser(userData) {
    return this.httpClient.post<{message: string}>(`${this.BACKEND_URL}/api/admin/add-new-user`, userData);
  }
}
