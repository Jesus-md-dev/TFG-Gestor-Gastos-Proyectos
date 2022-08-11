import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { passwordRegexValidator, usernameRegexValidator } from 'custom-validators.directive';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formGroup!: FormGroup;
  passwordMinLength: number = 8;
  firLasNameLenghth: number = 3;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService
  ) {
    this.formGroup = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            usernameRegexValidator()
          ],
        ],
        first_name: [
          '',
          [Validators.required, Validators.minLength(this.firLasNameLenghth)],
        ],
        last_name: [
          '',
          [Validators.required, Validators.minLength(this.firLasNameLenghth)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, passwordRegexValidator(this.passwordMinLength)],
        ],
        passwordRepeat: [
          '',
          [Validators.required, passwordRegexValidator(this.passwordMinLength)],
        ],
      },
      {
        validator: this.ConfirmedValidator('password', 'passwordRepeat'),
      }
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  register() {
    if (this.formGroup.valid) {
      User.create(
        this.formGroup.controls['username'].value,
        this.formGroup.controls['first_name'].value,
        this.formGroup.controls['last_name'].value,
        this.formGroup.controls['email'].value,
        this.formGroup.controls['password'].value
      ).then((response) => {
        if ('user_info' in response) {
          this.router.navigate(['/login']);
          this.snackBar.open(
            this.translate.instant('User') +
              ' ' +
              response['user_info']['username'] +
              ' ' +
              this.translate.instant('created'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        }
        else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else {
          this.snackBar.open(
            this.translate.instant('system error'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
        }
      });
    }
  }
}
