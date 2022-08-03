import { Component } from '@angular/core';
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
    public translate: TranslateService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    translate.addLangs(['en', 'es']);
    this.cur_lang = translate.langs.some((lang) => lang == navigator.language)
      ? navigator.language
      : 'en';
    translate.setDefaultLang(this.cur_lang);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        console.log("Navigation") 
        ApiConnectionService.isApiAlive().then((response) => {
          if (response != undefined) 
            this.localStorageService.set('apiAlive', true);
          else {
            this.localStorageService.set('apiAlive', false);
            this.localStorageService.remove('token');
            this.localStorageService.remove('username');            
          }
        });
      }
    });
  }

  // switchLang() {
  //   if (this.cur_lang === 'es') this.cur_lang = 'en';
  //   else this.cur_lang = 'es';
  //   this.translate.use(this.cur_lang);
  // }

  ngOnInit(): void {
    User.loadUser(this.localStorageService.get('username') as string).then(
      (response) => {
        if ('message' in response) {
          this.snackBar.open(response['message'], 'Close', {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        } else this.user = response;
      }
    );
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
