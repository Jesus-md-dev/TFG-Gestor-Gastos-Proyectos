import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../user';
import { Project } from '../project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User
  projects: any = []

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
  }

}