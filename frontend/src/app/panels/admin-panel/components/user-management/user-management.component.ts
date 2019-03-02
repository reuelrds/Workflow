import { Component, OnInit } from '@angular/core';

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
      title: 'Groups',
      body: ['You have', 'users requesting access to link to your account.'],
      action: 'Manage'
    },
  ];

  pendingRequests = 10;
  activeUsers = 15;
  inactiveUsers = 200;
  constructor() { }

  ngOnInit() {
  }

}
