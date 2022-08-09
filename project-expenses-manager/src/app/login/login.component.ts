import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../user';

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

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.get('token') != undefined)
      this.router.navigate(['/']);
  }

  login() {
    User.login(
      this.formGroup.controls['username'].value,
      this.formGroup.controls['password'].value
    ).then((response) => {
      if ('user_info' in response && 'token' in response) {
        this.localStorageService.set('token', response['token']);
        this.localStorageService.set(
          'username',
          response['user_info']['username']
        );
        window.location.reload();
      } else if ('message' in response) {
        this.snackBar.open(
          this.translate.instant('username password incorrect'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
      } else {
        this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
          duration: 3 * 1000,
        });
        this.router.navigate(['/']);
      }
    });
  }
}
