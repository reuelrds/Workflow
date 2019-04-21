import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ChangePermissionsComponent } from './change-permissions/change-permissions.component';
import { DefineWorkflowComponent } from './define-workflow/define-workflow.component';
import { DesignFormComponent } from './design-form/design-form.component';
import { FillFormDetailsComponent } from './fill-form-details/fill-form-details.component';
import { PublishAppComponent } from './publish-app/publish-app.component';
import { CreateAppComponent } from './create-app.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    ChangePermissionsComponent,
    DefineWorkflowComponent,
    DesignFormComponent,
    FillFormDetailsComponent,
    PublishAppComponent,
    CreateAppComponent
  ],
  entryComponents: [
    CreateAppComponent
  ]
})
export class CreateAppModule { }
