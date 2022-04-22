import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { GlobalComponent } from '../global-component';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  localStorageService = new LocalStorageService();
  username: string | any;
  password: string | any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.localStorageService.get('token') != undefined)
      this.router.navigate(['/']);
  }

  login() {
    axios
      .post(GlobalComponent.apiUrl + '/api/login/', {
        username: this.username,
        password: this.password,
      })
      .then(
        (response) => {
          this.localStorageService.set('token', response['data']['token']);
          this.localStorageService.set(
            'username',
            response['data']['user_info']['username']
          );
          window.location.reload();
        },
        (error) => {}
      );
  }
}
