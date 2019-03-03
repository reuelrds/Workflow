import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { EmployeeSignupComponent } from './signup/employee-signup/employee-signup.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    CompanySignupComponent,
    EmployeeSignupComponent
  ]
})
export class AuthModule { }
