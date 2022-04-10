import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { User } from '../user';
import { GlobalComponent } from '../global-component';
import { LocalStorageService } from '../local-storage.service';
import axios from 'axios';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user = new User();
  projects: any = [];
  users: any = [];
  localStorageService = new LocalStorageService()

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit(): void {
    // this.http
    //   .get(GlobalComponent.apiUrl + '/api/user/' + username)
    //   .subscribe((res) => {
    //     this.user = User.jsontoObject(res);
    //   });
    // this.http
    //   .get('http://127.0.0.1:8000/get_user_projects/' + username)
    //   .subscribe((res) => {
    //     this.projects = Project.jsontoList(res);
    //   });

    axios
      .get(
        GlobalComponent.apiUrl +
          '/api/user/' +
          this.localStorageService.get('username'),
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      )
      .then(
        (response) => {
          console.log(response);
          this.user = User.jsontoObject(response['data']['user_info']);
        },
        (error) => {
          console.log(error);
        }
      );
    //TODO rellenar projects
  }
}
