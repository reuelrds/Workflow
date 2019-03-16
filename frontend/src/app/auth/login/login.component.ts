import { style, state, animate, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HelperService } from './../../core/services/helper.service';
import { CustomValidatingService } from '../validators/custom-validators';
import { AuthService } from './../../core/services/auth.service';

import * as fromApp from './../../store/app.reducers';
import * as AuthActions from './../../auth/store/auth.actions';
import { Store } from '@ngrx/store';


/**
 * Login Component. Instantiates Login Form and handles events when the form is Submitted
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {

  /**
   * @param {FormGroup} loginForm Login form object.
   */
  loginForm: FormGroup;

  /**
   * @param {boolean} isLoading Used to show a spinner while awaiting response from the server
   */
  isLoading: boolean;

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
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {

    // Instantiate a Reactive foem object
    this.loginForm = new FormGroup({
      email: new FormControl(
        null, {
          validators: [
            this.customValidators.checkEmail,
            Validators.required
          ]
        }
      ),
      password: new FormControl(
        null, {
          validators: [
            Validators.required,
            Validators.minLength(6)
          ]
        }
      )
    });

    // Check is user already has a valid JWT Token. If so, then Log him in directly.
    this.authService.autoAuthUser();

    // Hide the Spinner
    this.isLoading = false;
  }

  /**
   * Communicates with AuthService to send data to server when the form is submitted
   */
  onSubmit() {
    console.log(this.loginForm);

    // Force check the form's validity
    this.helperService.markFormGroupTouched(this.loginForm);

    // Return is the form is invalid
    if (this.loginForm.invalid) {
      return;
    } else if (this.loginForm.valid) {

      // Else display the spinner and call login user method provided by AuthService
      // this.isLoading = true;
      // this.authService.loginUser(
      //   this.loginForm.value.email,
      //   this.loginForm.value.password,
      // ).subscribe(result => {
      //   this.isLoading = false;
      //   console.log('From Login Component');
      //   console.log(result);

      //   if (result.usertype === 'Admin') {
      //     this.router.navigate(['/admin-panel']);
      //   } else {
      //     this.router.navigate(['/client-panel']);
      //   }

      // }, error => {
      //   this.isLoading = false;
      // });
      this.store.dispatch({
        type: AuthActions.ActionTypes.TryLogin,
        payload: {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }});
    }
  }
}
