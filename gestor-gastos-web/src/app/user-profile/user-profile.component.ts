import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = new User();
  projects: any = [];
  localStorageService = new LocalStorageService();
  editView: boolean = false;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    let username = this.localStorageService.get('username') ?? undefined;
    if (username != undefined) {
      User.loadUser(username).then((response) => {
        this.user = response;
        this.formGroup.controls['first_name'].setValue(this.user.first_name);
        this.formGroup.controls['last_name'].setValue(this.user.last_name);
        this.user.getProjects().then((response: any) => {
          this.projects = response;
        });
      });
    }
  }

  save() {
    this.snackBar.open('Edit success', 'x', {
      duration: 3 * 1000,
    });
    this.changeView();
  }

  changeView() {
    this.editView = !this.editView;
  }
}
