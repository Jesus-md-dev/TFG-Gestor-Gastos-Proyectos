import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any = []

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http:///127.0.0.1:8000/get_all_users/').subscribe((res) => {
      this.users = User.jsontoList(res);
    })
  }
}
