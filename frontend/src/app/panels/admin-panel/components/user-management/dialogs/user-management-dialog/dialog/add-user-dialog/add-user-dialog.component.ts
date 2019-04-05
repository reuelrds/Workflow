import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromAdminPanel from '../../../../../../store/admin-panel.reducers';
import * as UserActions from '../../../../../../store/users/user.actions';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  addUserForm: FormGroup;

  addUserFormDataItems = [
    {name: 'firstName', placeholder: 'First Name'},
    {name: 'lastName', placeholder: 'Last Name'},
    {name: 'email', placeholder: 'E-mail'},
    {name: 'location', placeholder: 'Location', values: [
      {id: 'ostmeadow', name: 'Ostmeadow'},
      {id: 'norhaven', name: 'Norhaven'},
      {id: 'fairhollow', name: 'Fairhollow'},
    ]},
    {name: 'manager', placeholder: 'Manager', values: [
      {id: 'mrvi', name: 'Marshal Vise'},
      {id: 'nisi', name: 'Nicolais Sills'},
      {id: 'cabu', name: 'Carolynn Buckwalter'},
    ]},
    {name: 'department', placeholder: 'Department', values: [
      {id: 'technical', name: 'Technical'},
      {id: 'administration', name: 'Administration'},
    ]},
  ];

  constructor(private formBuilder: FormBuilder, private store: Store<fromAdminPanel.AdminPanelState>) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      manager: '',
      department: '',
      location: ''
    });
  }

  onSubmitAddUser() {
    console.log(this.addUserForm);
    this.store.dispatch({type: UserActions.ActionTypes.TryAddUser, payload: this.addUserForm.value});
  }

}
