import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { UserManagementDialogComponent } from './../../dialogComponents/user-management-dialog/user-management-dialog.component';

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
      action: ['Manage', 'Invite']
    },
    {
      title: 'Groups',
      body: 'You can create User-Groups, which you can use for Task assignments, Report sharing and for restricting App usage.',
      action: 'Manage'
    },
    {
      title: 'Departments',
      body: 'You will be able to restrict Apps to specific Departments & also be able to assign Tasks to the User\'s Department Head.',
      action: 'Manage'
    },
    {
      title: 'Locations',
      body: 'You will be able to restrict Apps to specific Locations. You will also be able to assign Tasks to the User\'s Location Head.',
      action: 'Manage'
    },
    {
      title: 'Pending Requests For Accesss',
      body: ['You have', 'users requesting access to link to your account.'],
      action: 'Manage'
    },
  ];

  pendingRequests = 10;
  activeUsers = 15;
  inactiveUsers = 200;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openUserManagementDialog() {
    const dialogRef = this.dialog.open(UserManagementDialogComponent, {
      width: 'max-content',
      height: 'max-content',
      minWidth: '80vw',
      minHeight: '70vh',
      autoFocus: false
    });
  }

}
