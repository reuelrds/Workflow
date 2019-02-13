import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Helper Functions which provide services to different components
 */

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * Recurses through all form fields and marks them as Touched and force checkes the field's validity.
   *
   * @param {FormGroup} formGroup FormGroup Object received when a form is Submitted. This is only for reactive forms
   */
  markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
