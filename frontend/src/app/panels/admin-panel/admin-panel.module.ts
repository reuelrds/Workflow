import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel.component';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AppsManagementComponent } from './components/apps-management/apps-management.component';

import {
  UserManagementDialogComponent
} from './components/user-management/dialogs/user-management-dialog/user-management-dialog.component';
import {
  AddUserDialogComponent
 } from './components/user-management/dialogs/user-management-dialog/dialog/add-user-dialog/add-user-dialog.component';

import { reducers, AdminPanelState } from './store/admin-panel.reducers';
import { UserEffects } from './store/users/user.effects';
import { CdkTableModule } from '@angular/cdk/table';
import {
  UserManagementDataTableComponent
} from './components/user-management/dialogs/user-management-dialog/user-management.data-table/user-management.data-table.component';
import {
  DepartmentDialogComponent
} from './components/user-management/dialogs/department-dialog/department-dialog.component';
import { DepartmentEffects } from './store/department/department.effects';
import {
  DepartmentDataTableComponent
} from './components/user-management/dialogs/department-dialog/department.data-table/department-data-table.component';
import {
  AddDepartmentDialogComponent
} from './components/user-management/dialogs/department-dialog/dialog/add-department-dialog/add-department-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('adminpanel', reducers),
    EffectsModule.forFeature([
      UserEffects,
      DepartmentEffects
    ]),
    CdkTableModule
  ],
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    AccountSettingsComponent,
    AppsManagementComponent,
    UserManagementDialogComponent,
    AddUserDialogComponent,
    UserManagementDataTableComponent,
    DepartmentDialogComponent,
    DepartmentDataTableComponent,
    AddDepartmentDialogComponent
  ],
  entryComponents: [
    AppsManagementComponent,
    UserManagementComponent,
    AccountSettingsComponent,
    UserManagementDialogComponent,
    AddUserDialogComponent,
    DepartmentDialogComponent,
    AddDepartmentDialogComponent
  ]
})
export class AdminPanelModule { }
