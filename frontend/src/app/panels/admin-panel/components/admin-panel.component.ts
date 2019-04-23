import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Observable } from 'rxjs';
import { Admin } from '../../../shared/models/admin';
import { AuthService } from '../../../core/services/auth.service';
import { AppsManagementComponent } from './apps-management/apps-management.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { Store } from '@ngrx/store';

import * as fromApp from './../../../store/app.reducers';
import * as AuthActions from './../../../auth/store/auth.actions';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss', './admin-panel-theme.component.scss']
})
export class AdminPanelComponent implements OnInit {

  admin: Admin = {name: '' , email: ''};

  tabs = [{label: 'User Management', component: UserManagementComponent},
          {label: 'App Management', component: AppsManagementComponent},
          {label: 'Account Settings', component: AccountSettingsComponent}];

  constructor(private adminService: AdminService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.adminService.getAdminData().subscribe(res => {
      // console.log(res);
      // this.admin = res;
    // });
    this.authService.autoAuthUser();
  }

  onLogout() {
    this.store.dispatch({
      type: AuthActions.ActionTypes.Logout
    });
    // this.authService.logout();
  }

}
