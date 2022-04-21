import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
    this.isApiAlive();
    if (this.apiIsAlive)
      if (this.localStorageService.get('token') != null)
        this.isTokenAvailable();
      else this.isLogged = false;
    if (!this.isLogged) this.router.navigate(['/login']);
    else {
      let user = new User('admin');
    }
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

  isTokenAvailable() {
    axios
      .get(GlobalComponent.apiUrl + '/api/tokenavailable/', {
        headers: {
          Authorization: 'Token ' + this.localStorageService.get('token'),
        },
      })
      .then(
        (response) => {
          this.isLogged = true;
        },
        (error) => {
          this.isLogged = false;
        }
      );
  }

  isApiAlive() {
    axios.get(GlobalComponent.apiUrl + '/api/isalive/').then(
      (response) => {
        this.apiIsAlive = true;
      },
      (error) => {
        this.apiIsAlive = false;
      }
    );
  }
}
