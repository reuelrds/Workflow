import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ChangePermissionsComponent } from './change-permissions/change-permissions.component';
import { DefineWorkflowComponent } from './define-workflow/define-workflow.component';
import { DesignFormComponent } from './design-form/design-form.component';
import { FillFormDetailsComponent } from './fill-form-details/fill-form-details.component';
import { PublishAppComponent } from './publish-app/publish-app.component';
import { CreateAppComponent } from './create-app.component';
import { TextComponent } from './form-components/text/text.component';
import { EditTextFieldComponent } from './form-components/text/edit-text-field/edit-text-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    DynamicModule.withComponents([TextComponent])
  ],
  declarations: [
    ChangePermissionsComponent,
    DefineWorkflowComponent,
    DesignFormComponent,
    FillFormDetailsComponent,
    PublishAppComponent,
    CreateAppComponent,
    TextComponent,
    EditTextFieldComponent
  ],
  entryComponents: [
    CreateAppComponent,
    EditTextFieldComponent
  ]
})
export class CreateAppModule { }
