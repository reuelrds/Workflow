import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * Provides Various custom Validators to be used with the Signup and Log in phase
 *
 */

@Injectable({
  providedIn: 'root'
})
export class CustomValidatingService {
  /**
   * Checks id the two fields are same or not.
   *
   * It retuens null on success. But throws an error the fields are wrong
   * Note:  This methos is generic and can be used to compare simply aby two input field
   *
   * @param {string} field1 Name of the input field.
   * @param {string} field2 Name of the field to test against the previous field.
   */
  comparePasswords(field1: string, field2: string) {
    return (abstractControl: AbstractControl) => {
      const passwd = abstractControl.get(field1).value;
      const confirmPasswd = abstractControl.get(field2);

      if (passwd === confirmPasswd.value) {
        return null;
      } else {
        confirmPasswd.setErrors({
          PasswordMatch: true
        });
      }
    };
  }

  /**
   * Checks Email Validity according to RFC2822.
   *
   * It retuens null on success. But throws erroros the fields are wrong
   * @param abstractControl Used to get the control object from a Reactive from
   */
  checkEmail(abstractControl: AbstractControl): { [key: string]: any } {
    // if email is null or not defined return
    if (!abstractControl.value) {
      return null;
    }

    // Regex to test.
    // tslint:disable-next-line:max-line-length
    const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!regex.test(abstractControl.value)) {
      return {
        invalidEmail: true
      };
    } else {
      return null;
    }
  }

  /**
   *
   * Checks the File size of uploaded image.
   * it throws an error if the value is greater than 8mb
   *
   * It retuens null on success. But throws erroros the fields are wrong
   * @param abstractControl Used to get the control object from a Reactive from
   */

  checkFileSize(abstractControl: AbstractControl): { [key: string]: any } {
    if (!abstractControl.value || typeof abstractControl.value === 'string') {
      return null;
    }
    if (abstractControl.value.size > 8388608) {
      return {
        largeFileSize: true
      };
    }
  }

  /**
   *
   * Checks the MIME Type of the file that is to be uploaded.
   * this is done by analyzing the first chuncks from the file
   *
   * It retuens null on success. But throws erroros the fields are wrong
   * @param abstractControl Used to get the control object from a Reactive from
   */
  checkImage(
    abstractControl: AbstractControl
  ): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    console.log('vtrv');
    if (!abstractControl.value || typeof abstractControl.value === 'string') {
      return of(null);
    }

    const file = abstractControl.value as File;
    const fileReader = new FileReader();
    const frObs = Observable.create(
      (observer: Observer<{ [key: string]: any }>) => {
        fileReader.addEventListener('loadend', () => {
          const arr = new Uint8Array(
            fileReader.result as ArrayBufferLike
          ).subarray(0, 4);

          let header = '';
          let isValid = false;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }
          console.log('header' + header);

          switch (header) {
            case '89504e47': // png
              isValid = true;
              break;
            case 'ffd8ffdb': // Jpg
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
            case 'ffd8ffee':
              isValid = true;
              break;
            default:
              isValid = false;
              break;
          }

          if (isValid) {
            observer.next(null);
          } else {
            observer.next({
              invalidFile: true
            });
          }

          observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
      }
    );
    return frObs;
  }
}
