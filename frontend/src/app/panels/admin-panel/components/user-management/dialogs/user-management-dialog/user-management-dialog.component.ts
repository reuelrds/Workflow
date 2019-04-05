import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { AddUserDialogComponent } from './dialog/add-user-dialog/add-user-dialog.component';

import * as fromAdminPanel from '../../../../store/admin-panel.reducers';
import * as UserActions from '../../../../store/users/user.actions';
import * as fromUserSelector from '../../../../store/users/user.selectors';
// import { selectAllUsers } from '../../store/users/user.selectors';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.scss']
})


export class UserManagementDialogComponent implements OnInit {

  showUserType = 'allUsers';
  addUserDialog: MatDialogRef<AddUserDialogComponent>;
  users;
  dataSet: Observable<User[]>;
  // cols: string[] = ['select', 'firstName', 'lastName', 'email', 'department', 'location', 'manager', 'Permissions', 'Status'];
  cols: string[] = ['select', 'firstName', 'lastName', 'email', 'manager'];

  constructor(private dialog: MatDialog,  private store: Store<fromAdminPanel.State>) { }

  ngOnInit() {
    this.store.dispatch({type: UserActions.ActionTypes.TryGetUsers});
    this.users = this.store.pipe(select(fromUserSelector.getAllUsers));
    this.users.subscribe(res => this.dataSet = of(res));

  }

  openAddUserDialog() {
     this.addUserDialog = this.dialog.open(AddUserDialogComponent, {
      width: 'max-content',
      height: 'max-content',
      minWidth: '35vw',
      minHeight: '20vh',
      autoFocus: false
    });

     this.addUserDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.store.dispatch({type: UserActions.ActionTypes.TryAddUser, payload: result.value});
      }
    });
  }

  onUpdateManager(event) {
    console.log(event);
    this.store.dispatch({type: UserActions.ActionTypes.TryUpdateUserManager, payload: {userId: event.userId, managerId: event.managerId}});
  }

}
