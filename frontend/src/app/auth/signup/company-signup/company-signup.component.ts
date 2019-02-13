import { Component, OnInit, Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  style,
  state,
  animate,
  transition,
  trigger
} from '@angular/animations';

import { CustomValidatingService } from '../../validators/custom-validators';
import { HelperService } from './../../../core/services/helper.service';
import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';

/**
 * @param {FormGroup} companyForm Admin form object.
 */

@Component({
  selector: 'app-company-signup',
  templateUrl: './company-signup.component.html',
  styleUrls: ['./company-signup.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CompanySignupComponent implements OnInit {
  /**
   * @param {FormGroup} companyForm Admin form object.
   */
  companySignup: FormGroup;

  /**
   * @param {boolean} isLoading Used to show a spinner while awaiting response from the server
   */
  isLoading: boolean;

  /**
   * @param {any} passwd Stores refernce to `paswords` field for easier access
   */
  passwd: any;

  /**
   * Injecting required Services
   *
   * @param helperService Provides functionality to force check the form
   * @param authService Provides methods to communicate with the server
   * @param customValidators Provides Custom Validation functions
   * @param router Provides ability to navigate to specified page on successfull login
   */
  constructor(
    private helperService: HelperService,
    private authService: AuthService,
    private customValidators: CustomValidatingService,
    private router: Router
  ) {}

  ngOnInit() {
    // Instantiate Admin Fom
    this.companySignup = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, this.customValidators.checkEmail]
      }),
      passwords: new FormGroup(
        {
          password: new FormControl(null, {
            validators: [Validators.required, Validators.pattern('.{6}.*')]
          }),
          confirmPassword: new FormControl(null, {
            validators: [Validators.required, Validators.pattern('.{6}.*')]
          })
        },
        {
          validators: [
            this.customValidators.comparePasswords(
              'password',
              'confirmPassword'
            )
          ]
        }
      )
    });

    // Store referenct to passowrds field
    this.passwd = this.companySignup.get('passwords');

    // Subscribe to event when password field value is changed.
    this.passwd.controls.password.valueChanges.subscribe(() => {
      // if it is changed then update the validity of confirmPassword field according to password field
      this.passwd.controls.confirmPassword.updateValueAndValidity();
    });

    // Hide the Spinner
    this.isLoading = false;
  }

  /**
   * Communicates with AuthService to send data to server when the form is submitted
   */
  onSubmit() {
    console.log(this.companySignup);

    // Force check the form's validity
    this.helperService.markFormGroupTouched(this.companySignup);

    // Return is the form is invalidv
    if (this.companySignup.invalid) {
      return;
    } else if (this.companySignup.valid) {
      // Show the spinner
      this.isLoading = true;

      // And call `createAdmin` function user method provided by AuthService
      this.authService.createAdmin(
        this.companySignup.value.name,
        this.companySignup.value.email,
        this.companySignup.value.passwords.password
      ).subscribe(result => {
        console.log('User Creation Successful');
        console.log(result.message);
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      }, error => {
        this.isLoading = false;
      });
    }
  }
}
