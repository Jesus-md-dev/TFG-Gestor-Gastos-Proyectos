import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  localStorageService = new LocalStorageService();
  durationInSeconds = 3;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.localStorageService.get('token') != undefined)
      this.router.navigate(['/']);
  }

  login() {
    UserService.userLogin(
      this.formGroup.controls['username'].value,
      this.formGroup.controls['password'].value
    ).then((response) => {
      if (
        response.hasOwnProperty('user_info') &&
        response.hasOwnProperty('token')
      ) {
        this.localStorageService.set('token', response['token']);
        this.localStorageService.set(
          'username',
          response['user_info']['username']
        );
        window.location.reload();
      } else {
        if (response.hasOwnProperty('error'))
          this.snackBar.open('Username or Password are incorrect', 'Close', {
            duration: this.durationInSeconds * 1000,
          });
      }
    });
  }
}
