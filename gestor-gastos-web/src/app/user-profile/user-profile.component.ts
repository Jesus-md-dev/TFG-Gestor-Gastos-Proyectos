import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  projects: any = [];
  localStorageService = new LocalStorageService()

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  async ngOnInit() {
    let username = this.localStorageService.get('username') ?? undefined;
    if (this.localStorageService.get('username') != undefined)
    {
      this.user = new User(username);
      this.projects = this.user.getProjects().then((response: any) => {
        this.projects = response;
      });
    }
  }
}
