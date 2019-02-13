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
import { Observable, of, Observer } from 'rxjs';
import { Router } from '@angular/router';

import { CustomValidatingService } from '../../validators/custom-validators';
import { HelperService } from './../../../core/services/helper.service';
import { AuthService } from './../../../core/services/auth.service';

/**
 * @param {FormGroup} employeeForm User form object.
 */

@Component({
  selector: 'app-employee-signup',
  templateUrl: './employee-signup.component.html',
  styleUrls: ['./employee-signup.component.scss'],
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
export class EmployeeSignupComponent implements OnInit {
  /**
   * @param {string} imagePreview Used to store the url of currently uploaded file
   */
  imagePreview;
  /**
   * @param {FormGroup} companyForm Admin form object.
   */
  employeeSignup: FormGroup;

  /**
   * @param {boolean} isLoading Used to show a spinner while awaiting response from the server
   */
  isLoading: boolean;

  /**
   * @param passwd Stores refernce to `paswords` field for easier access
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
    this.imagePreview = '';

    // instantiating employee Signup object
    this.employeeSignup = new FormGroup({
      image: new FormControl(
        null,
        this.customValidators.checkFileSize,
        this.customValidators.checkImage
      ),
      firstName: new FormControl(null, {
        validators: [Validators.required]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, this.customValidators.checkEmail]
      }),
      passwords: new FormGroup(
        {
          password: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(6)]
          }),
          confirmPassword: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(6)]
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
      ),
      token: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    // Store reference to passowrds field
    this.passwd = this.employeeSignup.get('passwords');
    // Subscribe to event when password field value is changed.
    this.passwd.controls.password.valueChanges.subscribe(() => {
      // if it is changed then update the validity of confirmPassword field according to password field
      this.passwd.controls.confirmPassword.updateValueAndValidity();
    });

    // Hide the spinner
    this.isLoading = false;
  }

  /**
   * Gets the file and adds/patches it to the employee form.
   * Also extracts file URL.
   *
   * @param { Event } event
   */
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.employeeSignup.patchValue({ image: file });
    this.employeeSignup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  /**
   * Communicates with AuthService to send data to server when the form is submitted
   */
  onSubmit() {
    // Force check the form's validity
    this.helperService.markFormGroupTouched(this.employeeSignup);

    if (this.employeeSignup.invalid) {
      return;
    } else {
      // Show the spinner
      this.isLoading = true;

      // And call `createAdmin` function user method provided by AuthService
      this.authService.createUser(
        this.employeeSignup.value.firstName,
        this.employeeSignup.value.lastName,
        this.employeeSignup.value.email,
        this.employeeSignup.value.passwords.password,
        this.employeeSignup.value.token,
        this.employeeSignup.value.image
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
