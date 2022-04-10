import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gestor-web';
  cur_lang: string;
  username!: string | null;
  password!: string | null;
  isLogged = false;
  localStorageService = new LocalStorageService();

  constructor(public translate: TranslateService, private http: HttpClient) {
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
    if (this.localStorageService.get('token') != null) this.isTokenAvailable();
    else this.isLogged = false;
    this.test()
  }

  login() {
    axios
      .post(GlobalComponent.apiUrl + '/api/login/', {
        username: this.username,
        password: this.password,
      })
      .then(
        (response) => {
          console.log(response);
          this.localStorageService.set('token', response['data']['token']);
          this.localStorageService.set('username',
            response['data']['user_info']['username']);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    axios
      .post(GlobalComponent.apiUrl + '/api/logout/',
      {},
      { headers:{
        'Authorization': 'Token ' + this.localStorageService.get('token')
      }})
      .then(
        (response) => {
          console.log(response)
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  isTokenAvailable() {
    axios
      .get(
        GlobalComponent.apiUrl + '/api/tokenavailable/',
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
          this.isLogged = true;
        },
        (error) => {
          console.log(error);
          this.isLogged = false;
        }
      );
  }

  test() {
    console.log(this.localStorageService.get('token') + " " +
      this.localStorageService.get('username'));
  }
}
