import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  durationInSeconds = 3;
  user: any = new User();
  projects: any = [];
  localStorageService = new LocalStorageService();

  constructor(private snackBar: MatSnackBar) {}

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

  createProject() {
    if (this.formGroup.valid) {
      Project.create(
        this.formGroup.controls['name'].value,
        this.formGroup.controls['category'].value
      ).then((response) => {
        if (response.hasOwnProperty('project_info')) {
          this.snackBar.open(
            'Project ' + response['project_info']['name'] + ' created',
            'Close',
            { duration: this.durationInSeconds * 1000 }
          );
          this.ngOnInit();
        } else
          this.snackBar.open('Project parameters are not correct', 'Close', {
            duration: this.durationInSeconds * 1000,
          });
      });
    }
  }
}
