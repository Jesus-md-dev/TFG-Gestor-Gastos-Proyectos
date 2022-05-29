import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  durationInSeconds = 3;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private router: Router) {
      this.formGroup = this.formBuilder.group(
        {
          username: ['', [Validators.required]],
          first_name: ['', [Validators.required]],
          last_name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required]],
          passwordRepeat: ['', [Validators.required]],
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
     if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

  register() {
    if (this.formGroup.valid) {
      User.create(
        this.formGroup.controls['username'].value,
        this.formGroup.controls['first_name'].value,
        this.formGroup.controls['last_name'].value,
        this.formGroup.controls['email'].value,
        this.formGroup.controls['password'].value
      ).then( (response) => {
          if (response.hasOwnProperty('user_info')) this.router.navigate(['/login']);
          else{
            if (response.hasOwnProperty('message'))
              this.snackBar.open('Email or username already used', 'Close', {
                duration: this.durationInSeconds * 1000
              });
          }
        }
      );
    }
  }
}
