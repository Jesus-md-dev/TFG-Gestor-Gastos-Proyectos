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
  users:{ [id: string] : User;} = {}
  constructor(private http: HttpClient) {
    const url = 'http://127.0.0.1:8000/get_all_users/'
    this.http.get(url).subscribe((res) => {
      this.json = res
    })

    this.json.forEach((user: any) => {
      console.log(user)
      var fields = user["fields"];
      this.users[user["pk"]] = new User({
        username: "usernametest",
        password: "aaa",
        name: "aaa",
        surname: "aaa",
        email: "aaa",
      });
    });
  }

  getData() {
    this.json.forEach((user: any) => {
      console.log(user)
    });
  }
}


