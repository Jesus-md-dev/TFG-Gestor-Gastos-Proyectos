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
  localStorageService = new LocalStorageService()

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let username = this.localStorageService.get('username') ?? undefined;
    if (this.localStorageService.get('username') != undefined)
    {
      this.user = new User(username);
      axios
        .get(
          GlobalComponent.apiUrl +
            '/api/projects/' +
            this.localStorageService.get('username'),
          {
            headers: {
              Authorization: 'Token ' + this.localStorageService.get('token'),
            },
          }
        )
        .then(
          (response) => { this.projects = Project.jsontoList(response['data']); },
          (error) => {}
        );
    }
  }
}
