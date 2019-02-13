import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompanySignupComponent } from './signup/company-signup/company-signup.component';
import { EmployeeSignupComponent } from './signup/employee-signup/employee-signup.component';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    CompanySignupComponent,
    EmployeeSignupComponent,
  ]
})
export class AuthModule { }
