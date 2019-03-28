import { state, style, trigger, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

import * as fromAdminPanel from '../../store/admin-panel.reducers';
import * as UserActions from '../../store/users/user.actions';
import * as fromUser from '../../store/users/user.reducers';
import * as fromUserSelector from '../../store/users/user.selectors';
// import { selectAllUsers } from '../../store/users/user.selectors';
import { Observable, of, from } from 'rxjs';


@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.scss'],
  animations: [
    trigger('slideIn', [
      state('false', style({
        transform: 'translate3d(100%, 0, 0)',
        opacity: 0,
        display: 'none'
      })),
      state('true', style({
        transform: 'translate3d(0,0,0)',
        // opacity: '100%'
      })),
      transition('false <=> true', animate('500ms ease-in-out')),
    ])
  ]
})


export class UserManagementDialogComponent implements OnInit {

  searchBox: FormControl;
  isSearchBoxVisible = false;
  isSearchBoxIconVisible = true;
  showUserType = 'allUsers';
  addUserDialog: MatDialogRef<AddUserDialogComponent>;
  users;
  dataSet;
  cols: string[] = ['select', 'firstName', 'lastName', 'email', 'department', 'location', 'manager', 'Permissions', 'Status'];
  // cols: string[] = ['id', 'name'];

  constructor(private dialog: MatDialog,  private store: Store<fromAdminPanel.State>) { }

  ngOnInit() {
    this.searchBox = new FormControl('');
    this.users = this.store.pipe(select(fromUserSelector.getAllUsers));
    this.users.subscribe(res => this.dataSet = of(res));
    console.log('fw', this.dataSet);

  }

  searchUsers() {
    console.log(this.searchBox.value);
  }

  showSearchBox() {
    this.isSearchBoxIconVisible = false;
    this.isSearchBoxVisible = true;
  }

  hideSearchBox() {
    this.isSearchBoxVisible = false;
    this.isSearchBoxIconVisible = true;
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

}
