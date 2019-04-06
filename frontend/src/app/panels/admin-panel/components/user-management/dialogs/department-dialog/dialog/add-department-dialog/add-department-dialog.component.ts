import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromAdminPanel from '../../../../../../store/admin-panel.reducers';
import * as DepartmentActions from '../../../../../../store/department/department.action';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-add-department-dialog',
  templateUrl: './add-department-dialog.component.html',
  styleUrls: ['./add-department-dialog.component.scss']
})
export class AddDepartmentDialogComponent implements OnInit {

  addDepartmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromAdminPanel.AdminPanelState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addDepartmentForm = this.formBuilder.group({
      departmentName: '',
      departmentHead: '',
    });
  }

  onSubmitAddDepartment() {
    console.log(this.addDepartmentForm);
  }

}
