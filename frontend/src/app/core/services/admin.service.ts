import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../shared/models/admin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { Department } from 'src/app/shared/models/department';

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
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

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

    return this.httpClient
      .get<{ name: string; email: string }>(
        `${this.BACKEND_URL}/api/admin/${this.adminId}`
      )
      .pipe(
        tap(result => {
          console.log('evrgr');
          console.log(result);
          this.adminData = result;
          console.log(this.adminData.name);
        })
      );
  }

  addNewUser(userData) {
    console.log('service: ', userData);
    return this.httpClient.post<{ message: string; user: User }>(
      `${this.BACKEND_URL}/api/user/add-new-user`,
      userData
    );
  }

  getUsers() {
    return this.httpClient.get<{ users: User[] }>(
      `${this.BACKEND_URL}/api/user/all-users`
    );
  }

  updateUserManager(userId, newManagerId) {
    console.log(userId);
    let managerId;
    if (!newManagerId) {
      managerId = { managerId: undefined };
    } else {
      managerId = { managerId: newManagerId };
    }
    // return this.httpClient.patch<{message: string, user: User}>(`${this.BACKEND_URL}/api/user/update-manager/${userId}`, managerId);
    return this.httpClient.patch<{
      message: string;
      user: User;
      manager: User;
    }>(`${this.BACKEND_URL}/api/user/update-manager/${userId}`, managerId);
  }

  getDepartments() {
    return this.httpClient.get<{ departments: Department[] }>(
      `${this.BACKEND_URL}/api/department/all-departments`
    );
  }

  addNewDepartment(newDepartmentData) {
    return this.httpClient.post<{ message: string; department: Department }>(
      `${this.BACKEND_URL}/api/department/new-department`,
      newDepartmentData
    );
  }

  updateDepartment(updatedDetails) {
    console.log(updatedDetails);
    if (updatedDetails.updateField === 'name') {
      return this.httpClient.patch<{ message: string; department: Department }>(
        `${this.BACKEND_URL}/api/department/${
          updatedDetails.department.id
        }/updateDepartmentName`,
        { newDepartmentName: updatedDetails.department.departmentName }
      );
    } else if (updatedDetails.updateField === 'head') {
      return this.httpClient.patch<{ message: string; department: Department }>(
        `${this.BACKEND_URL}/api/department/${
          updatedDetails.department.id
        }/updateDepartmentHead`,
        { newDepartmentHead: updatedDetails.department.departmentHead }
      );
    }
  }
}
