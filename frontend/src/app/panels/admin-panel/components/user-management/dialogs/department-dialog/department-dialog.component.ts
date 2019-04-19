import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AddDepartmentDialogComponent } from './dialog/add-department-dialog/add-department-dialog.component';

import { Department } from 'src/app/shared/models/department';

import * as fromAdminPanel from '../../../../store/admin-panel.reducers';
import * as DepartmentActions from './store/department.action';
import * as fromDepartmentSelector from './store/department.selectors';
import * as fromUserSelector from '../user-management-dialog/store/user.selectors';
import * as UserActions from '../user-management-dialog/store/user.actions';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss']
})
export class DepartmentDialogComponent implements OnInit {
  addDepartmentDialog: MatDialogRef<AddDepartmentDialogComponent>;
  dataSet: Observable<Department[]>;
  users: Observable<User[]>;
  cols: string[] = [
    'select',
    'departmentName',
    'departmentHeadName',
    'staffCount',
    'icons'
  ];

  constructor(
    private dialog: MatDialog,
    private store: Store<fromAdminPanel.State>
  ) {}

  ngOnInit() {
    // this.store.dispatch(new DepartmentActions.TryGetDepartments());
    // this.store.dispatch(new UserActions.TryGetUsers());
    // const departmentState = this.store.pipe(select(fromDepartmentSelector.getAllDepartments));

    const departmentState = this.store.pipe(select(fromDepartmentSelector.dep));
    const userState = this.store.pipe(select(fromUserSelector.getAllUsers));

    departmentState.subscribe(departments => (this.dataSet = of(departments)));
    userState.subscribe(users => (this.users = of(users)));
  }

  openAddDepartmentDialog(department = null) {
    this.addDepartmentDialog = this.dialog.open(AddDepartmentDialogComponent, {
      width: 'max-content',
      height: 'max-content',
      minWidth: '20vw',
      minHeight: '20vh',
      autoFocus: false,
      data: {
        users: this.users,
        department
      }
    });

    this.addDepartmentDialog.afterClosed().subscribe(result => {
      if (result && !department) {
        this.store.dispatch({
          type: DepartmentActions.ActionTypes.TryAddDepartment,
          payload: result.value
        });
      } else if (result && department) {
        const updatedDetails = {
          department: result.value,
          updateField: ''
        };

        updatedDetails.updateField =
          result.value.departmentName === department.departmentName
            ? 'head'
            : 'name';
        console.log(updatedDetails);
        this.store.dispatch(new DepartmentActions.TryUpdateDepartment(updatedDetails));
      }
    });
  }

  onOpenDialog(event) {
    console.log(event);
    if (event.dialogType === 'editDialog') {
      this.openAddDepartmentDialog(event.department);
    }
  }
}
