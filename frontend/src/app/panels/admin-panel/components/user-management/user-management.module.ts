import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserManagementDialogModule } from './dialogs/user-management-dialog/user-management-dialog.module';
import { GroupModule } from './dialogs/group-dialog/group.module';
import { DepartmentModule } from './dialogs/department-dialog/department.module';
import { LocationModule } from './dialogs/location-dialog/location.module';




@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    UserManagementDialogModule,
    GroupModule,
    DepartmentModule,
    LocationModule
  ]
})

export class UserManagementModule {}
