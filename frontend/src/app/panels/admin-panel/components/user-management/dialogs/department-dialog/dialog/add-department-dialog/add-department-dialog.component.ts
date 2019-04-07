import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromAdminPanel from '../../../../../../store/admin-panel.reducers';
import * as DepartmentActions from '../../../../../../store/department/department.action';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { identifier } from '@babel/types';

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
    let name = '';
    let headId = '';
    let departmentId = '';

    if (this.data.department) {
      name = this.data.department.departmentName;
      headId = this.data.department.departmentHead;
      departmentId = this.data.department.id;
    }
    this.addDepartmentForm = this.formBuilder.group({
      departmentName: name,
      departmentHead: headId,
      id: departmentId
    });
  }

  onSubmitAddDepartment() {
    console.log(this.addDepartmentForm);
  }

}
