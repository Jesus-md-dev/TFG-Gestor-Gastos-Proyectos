import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import UsersList from '../userlist.json';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any = []
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    try {
      this.http.get('http:///127.0.0.1:8000/get_all_users/').subscribe((res) => {
      this.users = User.jsontoList(res);
      console.log(res)

    });
    } catch (error) {

    }

    if (this.users.length === 0) {
      this.users = User.jsontoList(UsersList);
    }
  }
}

function saveText(text: string | number | boolean, filename: string){
  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  a.setAttribute('download', filename);
  a.click()
}
