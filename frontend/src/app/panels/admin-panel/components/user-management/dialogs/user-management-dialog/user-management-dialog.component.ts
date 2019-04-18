import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { AddUserDialogComponent } from './dialog/add-user-dialog/add-user-dialog.component';

import * as fromAdminPanel from '../../../../store/admin-panel.reducers';
import * as UserActions from '../../../../store/users/user.actions';
import * as fromUserSelector from '../../../../store/users/user.selectors';
// import { selectAllUsers } from '../../store/users/user.selectors';
import { of, Observable, merge, zip, combineLatest } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { map } from 'rxjs/operators';

import * as fromGroupSelector from './../../../../store/group/group.selectors';
import * as fromDepartmentSelector from './../../../../store/department/department.selectors';
import * as fromLocationSelector from './../../../../store/location/location.selectors';
import { Group } from 'src/app/shared/models/group';
import { Department } from 'src/app/shared/models/department';
import { Location } from 'src/app/shared/models/location';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-management-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.scss']
})


export class UserManagementDialogComponent implements OnInit {

  showUserType = 'allUsers';
  addUserDialog: MatDialogRef<AddUserDialogComponent>;
  users: Observable<User[]>;
  groups: Observable<Group[]>;
  departments: Observable<Department[]>;
  locations: Observable<Location[]>;
  // dataSet: Observable<any>;
  // cols: string[] = ['select', 'firstName', 'lastName', 'email', 'department', 'location', 'manager', 'Permissions', 'Status'];
  cols: string[] = ['select', 'firstName', 'lastName', 'email', 'manager', 'department', 'location', 'group'];

  constructor(
    private dialog: MatDialog,
    private store: Store<fromAdminPanel.State>,
    private actions$: Actions
  ) { }

  ngOnInit() {
    // this.store.dispatch({type: UserActions.ActionTypes.TryGetUsers});

    const userState = this.store.pipe(select(fromUserSelector.getAllUsers));
    const groupState = this.store.pipe(select(fromGroupSelector.getAllGroups));
    const departmentState = this.store.pipe(select(fromDepartmentSelector.getAllDepartments));
    const locationState = this.store.pipe(select(fromLocationSelector.getAllLocations));

    userState.subscribe((users: User[]) => this.users = of(users));
    groupState.subscribe((groups: Group[]) => this.groups = of(groups));
    departmentState.subscribe((departments: Department[]) => this.departments = of(departments));
    locationState.subscribe((locations: Location[]) => this.locations = of(locations));

    // this.users.subscribe(res => this.dataSet = of(res));

  }

  openAddUserDialog() {
    this.addUserDialog = this.dialog.open(AddUserDialogComponent, {
      width: 'max-content',
      height: 'max-content',
      minWidth: '35vw',
      minHeight: '20vh',
      autoFocus: false,
      data: {
        users: this.users,
        departments: this.departments,
        locations: this.locations,
        groups: this.groups
      }
    });

    this.addUserDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.store.dispatch({type: UserActions.ActionTypes.TryAddUser, payload: result.value});

        this.actions$.pipe(
          ofType(UserActions.ActionTypes.AddUser)
        ).subscribe((newAddUserAction: UserActions.AddUser) => {
          const newUserId = newAddUserAction.payload.id;

          this.store.dispatch(
            new UserActions.TryUpdateUserManager({
              userId: newUserId,
              managerId: result.value.manager
            })
          );

          this.store.dispatch(
            new UserActions.TryUpdateUsersDepartment({
              userId: newUserId,
              departmentId: result.value.department
            })
          );

          this.store.dispatch(
            new UserActions.TryUpdateUsersLocation({
              userId: newUserId,
              locationId: result.value.location
            })
          );

          this.store.dispatch(
            new UserActions.TryUpdateUsersGroup({
              userId: newUserId,
              groupId: result.value.group
            })
          );

        });
      }
    });
  }

  onUpdateManager(event) {
    console.log(event);
    this.store.dispatch({type: UserActions.ActionTypes.TryUpdateUserManager, payload: {userId: event.userId, managerId: event.managerId}});
  }

  onUpdateGroup(event) {
    console.log(event);
    this.store.dispatch(new UserActions.TryUpdateUsersGroup({userId: event.userId, groupId: event.groupId}));
  }

  onUpdateDepartment(event) {
    console.log(event);
    this.store.dispatch(new UserActions.TryUpdateUsersDepartment({userId: event.userId, departmentId: event.departmentId}));
  }

  onUpdateLocation(event) {
    console.log(event);
    this.store.dispatch(new UserActions.TryUpdateUsersLocation({userId: event.userId, locationId: event.locationId}));
  }

}
