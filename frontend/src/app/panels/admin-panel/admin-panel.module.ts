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

import { reducers } from './store/admin-panel.reducers';

import { CdkTableModule } from '@angular/cdk/table';

import { DepartmentModule } from './components/user-management/dialogs/department-dialog/department.module';
import { GroupModule } from './components/user-management/dialogs/group-dialog/group.module';
import { LocationModule } from './components/user-management/dialogs/location-dialog/location.module';
import { UserManagementDialogModule } from './components/user-management/dialogs/user-management-dialog/user-management-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('adminpanel', reducers),
    CdkTableModule,
    DepartmentModule,
    GroupModule,
    LocationModule,
    UserManagementDialogModule
  ],
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    AccountSettingsComponent,
    AppsManagementComponent
  ],
  entryComponents: [
    AppsManagementComponent,
    UserManagementComponent,
    AccountSettingsComponent
  ]
})
export class AdminPanelModule {}
