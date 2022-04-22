import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  title = 'gestor-web';
  cur_lang: string;
  username: string | any;
  password: string | any;
  isLogged = true;
  apiIsAlive = true;
  localStorageService = new LocalStorageService();

  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    private router: Router
  ) {
    {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
      this.cur_lang = 'en';
    }
  }

  switchLang() {
    if (this.cur_lang === 'es') this.cur_lang = 'en';
    else this.cur_lang = 'es';
    this.translate.use(this.cur_lang);
  }

  ngOnInit(): void {
    ApiConnectionService.isApiAlive().then(
      (response) => {
        this.apiIsAlive = true;
        if (this.localStorageService.get('token') != null)
          ApiConnectionService.isTokenAvailable().then(
            (response) => {
              this.isLogged = true;
            },
            (error) => {
              this.notLogged();
              this.localStorageService.remove('token');
              this.router.navigate(['/login']);
            }
          );
        else this.notLogged();
      },
      (error) => {
        this.apiIsAlive = false;
      }
    );
  }

  logout() {
    axios
      .post(
        GlobalComponent.apiUrl + '/api/logout/',
        {},
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      )
      .then(
        (response) => {
          this.ngOnInit();
        },
        (error) => {}
      );

    this.localStorageService.remove('token');
    this.localStorageService.remove('username');
  }

  notLogged() {
    this.isLogged = false;
    if (this.router.url !== '/login' && this.router.url !== '/register')
      this.router.navigate(['/login']);
  }
}
