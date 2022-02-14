import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'gestor-web';
  json:any = []
  users:any = []
  constructor(private http: HttpClient) {
    const url = 'http://127.0.0.1:8000/get_all_users/'
    this.http.get(url).subscribe((res) => {
      this.json = res
      this.json.forEach((user: any) => {
        this.users.push(new User(
          user["pk"],
          user["fields"]["username"],
          user["fields"]["password"],
          user["fields"]["name"],
          user["fields"]["surname"],
          user["fields"]["email"],
        ));
      });
      console.log(this.json);
    })
  }
}


