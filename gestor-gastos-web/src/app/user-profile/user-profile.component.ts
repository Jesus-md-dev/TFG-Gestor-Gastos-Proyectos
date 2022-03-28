import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { User } from '../user';
import UsersList from '../userlist.json';
import ProjectList from '../projectlist.json';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = new User();
  projects: any = []
  users: any = []

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const username = String(routeParams.get('username'));
    this.http.get('http://127.0.0.1:8000/get_user/' + username).subscribe((res) => {
      this.user = User.jsontoObject(res);
    })
    this.http.get('http://127.0.0.1:8000/get_user_projects/' + username).subscribe((res) => {
      this.projects = Project.jsontoList(res);
    })
    this.user = User.jsontoList(UsersList)[0];
    this.users = User.jsontoList(UsersList);
    this.projects = Project.jsontoList(ProjectList);
  }

}
