import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAdminPanel from '../../../../../../store/admin-panel.reducers';
import * as UserActions from '../../store/user.actions';

import { Department } from 'src/app/shared/models/department';
import { Group } from 'src/app/shared/models/group';
import { Location } from 'src/app/shared/models/location';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  addUserForm: FormGroup;

  addUserFormDataItems = [
    { name: 'firstName', placeholder: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name' },
    { name: 'email', placeholder: 'E-mail' },
    {
      name: 'location',
      placeholder: 'Location',
      values: [
        { id: 'ostmeadow', name: 'Ostmeadow' },
        { id: 'norhaven', name: 'Norhaven' },
        { id: 'fairhollow', name: 'Fairhollow' }
      ]
    },
    {
      name: 'manager',
      placeholder: 'Manager',
      values: [
        { id: 'mrvi', name: 'Marshal Vise' },
        { id: 'nisi', name: 'Nicolais Sills' },
        { id: 'cabu', name: 'Carolynn Buckwalter' }
      ]
    },
    {
      name: 'department',
      placeholder: 'Department',
      values: [
        { id: 'technical', name: 'Technical' },
        { id: 'administration', name: 'Administration' }
      ]
    },
    {
      name: 'group',
      placeholder: 'Group',
      values: []
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromAdminPanel.AdminPanelState>,
    private actions$: Actions,
    @Inject(MAT_DIALOG_DATA) public data: {
      users: Observable<User[]>;
      departments: Observable<Department[]>;
      locations: Observable<Location[]>;
      groups: Observable<Group[]>;
    }
  ) {}

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      manager: '',
      department: '',
      location: '',
      group: ''
    });
    console.log(this.data);
    this.data.departments.subscribe((departments: Department[]) => {
      departments.forEach((department: Department) => {
        this.addUserFormDataItems[5].values.push({
          id: department.id,
          name: department.departmentName
        });
      });
    });

    this.data.locations.subscribe((locations: Location[]) => {
      locations.forEach((location: Location) => {
        this.addUserFormDataItems[3].values.push({
          id: location.id,
          name: location.locationName
        });
      });
    });

    this.data.groups.subscribe((groups: Group[]) => {
      groups.forEach((group: Group) => {
        this.addUserFormDataItems[6].values.push({
          id: group.id,
          name: group.groupName
        });
      });
    });

    this.data.users.subscribe((users: User[]) => {
      users.forEach((user: User) => {
        this.addUserFormDataItems[4].values.push({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`
        });
      });
    });

  }

  onSubmitAddUser() {
    // console.log(this.addUserForm);
    this.store.dispatch(new UserActions.TryAddUser(
      {
        firstName: this.addUserForm.value.firstName,
        lastName: this.addUserForm.value.lastName,
        email: this.addUserForm.value.email
      }
    ));

    this.actions$.pipe(
      ofType(UserActions.ActionTypes.AddUser)
    ).subscribe((newAddUserAction: UserActions.AddUser) => {
      const newUserId = newAddUserAction.payload.id;

      this.store.dispatch(
        new UserActions.TryUpdateUserManager({
          userId: newUserId,
          managerId: this.addUserForm.value.manager
        })
      );

      this.store.dispatch(
        new UserActions.TryUpdateUsersDepartment({
          userId: newUserId,
          departmentId: this.addUserForm.value.department
        })
      );

      this.store.dispatch(
        new UserActions.TryUpdateUsersLocation({
          userId: newUserId,
          locationId: this.addUserForm.value.location
        })
      );

      this.store.dispatch(
        new UserActions.TryUpdateUsersGroup({
          userId: newUserId,
          groupId: this.addUserForm.value.group
        })
      );

    });
  }
}
