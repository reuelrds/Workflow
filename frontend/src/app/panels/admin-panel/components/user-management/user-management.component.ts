import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';

import { UserManagementDialogComponent } from './dialogs/user-management-dialog/user-management-dialog.component';
import { DepartmentDialogComponent } from './dialogs/department-dialog/department-dialog.component';
import { LocationDialogComponent } from './dialogs/location-dialog/location-dialog.component';
import { GroupDialogComponent } from './dialogs/group-dialog/group-dialog.component';

import * as fromAdminPanel from './../../store/admin-panel.reducers';
import * as UserActions from './dialogs/user-management-dialog/store/user.actions';
import * as GroupActions from './dialogs/group-dialog/store/group.action';
import * as DepartmentActions from './dialogs/department-dialog/store/department.action';
import * as LocationActions from './dialogs/location-dialog/store/location.action';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  cardsText = [
    {
      title: 'Users',
      body: ['Active Users', 'Inactive Users'],
      action: ['Manage', 'Invite'],
      method: this.openUserManagementDialog
    },
    {
      title: 'Groups',
      body: 'You can create User-Groups, which you can use for Task assignments, Report sharing and for restricting App usage.',
      action: 'Manage',
      method: this.openGroupDialog
    },
    {
      title: 'Departments',
      body: 'You will be able to restrict Apps to specific Departments & also be able to assign Tasks to the User\'s Department Head.',
      action: 'Manage',
      method: this.openDepartmentDialog
    },
    {
      title: 'Locations',
      body: 'You will be able to restrict Apps to specific Locations. You will also be able to assign Tasks to the User\'s Location Head.',
      action: 'Manage',
      method: this.openLocationDialog
    },
    {
      title: 'Pending Requests For Accesss',
      body: ['You have', 'users requesting access to link to your account.'],
      action: 'Manage',
      // method: 'openDepartmentDialog'
    },
  ];

  pendingRequests = 10;
  activeUsers = 15;
  inactiveUsers = 200;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromAdminPanel.State>
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.TryGetUsers());
    this.store.dispatch(new GroupActions.TryGetGroups());
    this.store.dispatch(new DepartmentActions.TryGetDepartments());
    this.store.dispatch(new LocationActions.TryGetLocations());
  }

  openUserManagementDialog(ref) {
    const dialogRef = ref.dialog.open(UserManagementDialogComponent, {
      width: '80vw',
      height: '80vh',
      autoFocus: false
    });
  }

  openDepartmentDialog(ref) {
    const dialogRef = ref.dialog.open(DepartmentDialogComponent, {
      width: '80vw',
      height: '80vh',
      autoFocus: false
    });
  }

  openLocationDialog(ref) {
    const dialogRef = ref.dialog.open(LocationDialogComponent, {
      width: '80vw',
      height: '80vh',
      autoFocus: false
    });
  }

  openGroupDialog(ref) {
    const dialogRef = ref.dialog.open(GroupDialogComponent, {
      width: '80vw',
      height: '80vh',
      autoFocus: false
    });
  }

}
