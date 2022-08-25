import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { ApiConnectionService } from './api-connection.service';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cur_lang: string;
  localStorageService = new LocalStorageService();
  user: User = new User();
  currentYear = new Date().getFullYear();

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    translate.addLangs(['en', 'es']);
    let aux_lang = this.localStorageService.get('language');
    if (aux_lang != null) this.cur_lang = aux_lang;
    else {
      this.cur_lang = translate.langs.some((lang) => lang == navigator.language)
        ? navigator.language
        : 'en';
      this.localStorageService.set('language', this.cur_lang);
    }
    translate.setDefaultLang(this.cur_lang);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        ApiConnectionService.isApiAlive().then((response) => {
          if (response != undefined)
            this.localStorageService.set('apiAlive', true);
          else {
            this.snackBar.open(
              this.translate.instant('api not alive'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.localStorageService.set('apiAlive', false);
            this.localStorageService.remove('token');
            this.localStorageService.remove('username');
          }
        });
      }
    });
  }

  switchLang() {
    if (this.cur_lang === 'es') {
      this.cur_lang = 'en';
    } else this.cur_lang = 'es';
    this.localStorageService.set('language', this.cur_lang);
    this.translate.use(this.cur_lang);
  }

  ngOnInit(): void {
    if (this.localStorageService.get('username') != null) {
      User.loadUser(this.localStorageService.get('username') as string).then(
        (response) => {
          if ('user_info' in response)
            this.user = User.jsontoObject(response['user_info']);
          else if ('message' in response) {
            this.snackBar.open(
              this.translate.instant(response['message']),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
          } else if ('detail' in response) {
            this.localStorageService.remove('username');
            this.localStorageService.remove('token');
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
        }
      );
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    axios.post(
      GlobalComponent.apiUrl + '/api/logout/',
      {},
      {
        headers: {
          Authorization: 'Token ' + this.localStorageService.get('token'),
        },
      }
    );
    this.localStorageService.remove('token');
    this.localStorageService.remove('username');
    this.router.navigate(['/login']);
  }

  isLogged() { return this.localStorageService.get('token') != null; }
}
