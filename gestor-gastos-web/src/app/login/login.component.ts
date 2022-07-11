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
      if ('user_info' in response && 'token' in response) {
        this.localStorageService.set('token', response['token']);
        this.localStorageService.set('username', response['user_info']['username']);
        window.location.reload();
      } else {
        if ('message' in response)
          this.snackBar.open('Username or Password are incorrect', 'Close', {
            duration: 3 * 1000,
          });
      }
    });
  }
}
