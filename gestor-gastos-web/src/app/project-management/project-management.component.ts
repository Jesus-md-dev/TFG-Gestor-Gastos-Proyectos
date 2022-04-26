import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../user';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor() { }
  user: any = new User();
  projects: any = [];
  localStorageService = new LocalStorageService();

  ngOnInit(): void {
    let username = this.localStorageService.get('username') ?? undefined;
    if (username != undefined) {
      User.loadUser(username).then((response) => {
        this.user = response;
        this.user.getProjects().then((response: any) => {
          this.projects = response;
        });
      });
    }
  }
}
