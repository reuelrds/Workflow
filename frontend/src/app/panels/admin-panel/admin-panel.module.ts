import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './components/admin-panel.component';

import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

import { reducers } from './store/admin-panel.reducers';

import { CdkTableModule } from '@angular/cdk/table';

import { AppManagementModule } from './components/apps-management/app-management.module';
import { UserManagementModule } from './components/user-management/user-management.module';
import { ThemePickerModule } from 'src/app/shared/components/theme-picker/theme-picker.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('adminpanel', reducers),
    CdkTableModule,
    AppManagementModule,
    UserManagementModule,
    ThemePickerModule
  ],
  declarations: [
    AdminPanelComponent,
    AccountSettingsComponent,
  ],
  entryComponents: [
    AccountSettingsComponent
  ]
})
export class AdminPanelModule {}
