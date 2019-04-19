import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { userReducer } from './store/user.reducers';
import { UserEffects } from './store/user.effects';

import { AddUserDialogComponent } from './dialog/add-user-dialog/add-user-dialog.component';
import { UserManagementDataTableComponent } from './user-management.data-table/user-management.data-table.component';
import { UserManagementDialogComponent } from './user-management-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([
      UserEffects
    ])
  ],
  declarations: [
    UserManagementDialogComponent,
    AddUserDialogComponent,
    UserManagementDataTableComponent
  ],
  entryComponents: [
    UserManagementDialogComponent,
    AddUserDialogComponent
  ]
})

export class UserManagementDialogModule {}
