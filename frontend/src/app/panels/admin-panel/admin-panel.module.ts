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

import { UserManagementDialogComponent } from './dialogComponents/user-management-dialog/user-management-dialog.component';
import { AddUserDialogComponent } from './dialogComponents/add-user-dialog/add-user-dialog.component';

import { reducers } from './store/admin-panel.reducers';
import { UserEffects } from './store/users/user.effects';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('admin-panel', reducers),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    AdminPanelComponent,
    UserManagementComponent,
    AccountSettingsComponent,
    AppsManagementComponent,
    UserManagementDialogComponent,
    AddUserDialogComponent
  ],
  entryComponents: [
    AppsManagementComponent,
    UserManagementComponent,
    AccountSettingsComponent,
    UserManagementDialogComponent,
    AddUserDialogComponent
  ]
})
export class AdminPanelModule { }
