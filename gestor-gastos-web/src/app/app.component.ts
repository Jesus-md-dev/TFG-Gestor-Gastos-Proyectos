import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from './user';
import UsersList from './userlist.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'gestor-web';
  cur_lang: string;
  user = new User();
  username: string = "";
  password: string = "";
  userTest: User = new User();
  json: any;
  obj: any;

  constructor(public translate: TranslateService, private http: HttpClient) {
    {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
      this.cur_lang = 'en'
    }
  }

  switchLang() {
    if(this.cur_lang === 'es')
      this.cur_lang = 'en'
    else
      this.cur_lang = 'es'
    this.translate.use(this.cur_lang);
  }

  ngOnInit(): void {
    this.user = User.jsontoList(UsersList)[0];
    this.http.post<any>('http://127.0.0.1:8000/api/login/',{
      "username": "admin",
      "password": "admin"
    }).subscribe(data => {
      console.log("username: " + data.token);
    }
    );
  }
}
