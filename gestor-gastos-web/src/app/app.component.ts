import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

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
  localStorageService = new LocalStorageService();

  constructor(public translate: TranslateService, private router: Router) {
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

  ngOnInit(): void {}

  getUrl() {
    return this.router.url != '/login' && this.router.url != '/register';
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

  isLogged() {
    return this.localStorageService.get('token') != null;
  }
}
