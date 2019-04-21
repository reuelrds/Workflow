import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AppsManagementComponent } from './apps-management.component';
import { CreateAppModule } from './dialogs/create-app/create-app.module';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    CreateAppModule
  ],
  declarations: [
    AppsManagementComponent
  ],
  entryComponents: [
    AppsManagementComponent
  ]
})

export class AppManagementModule {}
