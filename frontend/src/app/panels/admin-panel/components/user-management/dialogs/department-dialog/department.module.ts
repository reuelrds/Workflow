import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { DepartmentDialogComponent } from './department-dialog.component';
import { DepartmentDataTableComponent } from './department.data-table/department-data-table.component';
import { AddDepartmentDialogComponent } from './dialog/add-department-dialog/add-department-dialog.component';

import { DepartmentEffects } from './store/department.effects';
import { departmentReducer } from './store/department.reducers';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('department', departmentReducer),
    EffectsModule.forFeature([
      DepartmentEffects
    ]),
  ],
  declarations: [
    DepartmentDialogComponent,
    DepartmentDataTableComponent,
    AddDepartmentDialogComponent
  ],
  entryComponents: [
    DepartmentDialogComponent,
    AddDepartmentDialogComponent
  ]
})

export class DepartmentModule {}
