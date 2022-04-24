import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 3;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('password', 'passwordRepeat')
    });
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
      let user = User.create(
        this.formGroup.controls['username'].value,
        this.formGroup.controls['first_name'].value,
        this.formGroup.controls['last_name'].value,
        this.formGroup.controls['email'].value,
        this.formGroup.controls['username'].value
      ).then( (response) => {
          if (response.hasOwnProperty('user_info')) this.router.navigate(['/login']);
          else{
            let errors = []
            if (response.hasOwnProperty('email'))
              this.snackBar.open('Email is already used', 'x', {
                duration: this.durationInSeconds * 1000
              });
            if (response.hasOwnProperty('username'))
              this.snackBar.open('Username is already used', 'x', {
                duration: this.durationInSeconds * 1000,
              });
          }
        }
      );
    }
  }
}
