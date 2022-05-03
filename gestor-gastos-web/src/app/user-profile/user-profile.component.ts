import { Component, OnInit } from '@angular/core';
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
  ownProjects: any = [];
  memberProjects: any = [];
  localStorageService = new LocalStorageService();
  editView: boolean = false;
  formGroup!: FormGroup;
  name = 'NAME';

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    let username = this.localStorageService.get('username') ?? undefined;
    if (username != undefined) {
      User.loadUser(username).then((response) => {
        this.user = response;
        this.formGroup.controls['first_name'].setValue(this.user.first_name);
        this.formGroup.controls['last_name'].setValue(this.user.last_name);
        this.user.getProjects().then((response: any) => {
          this.ownProjects = response;
        });
        this.user.getProjectsMember().then((response: any) => {
          this.memberProjects = response;
        });
      });
    }
  }

  save() {
    this.user.first_name = this.formGroup.controls['first_name'].value;
    this.user.last_name = this.formGroup.controls['last_name'].value;
    this.user.save().then((response: any) => {
      if (response.hasOwnProperty('user_info')) {
        this.user = User.jsontoObject(response['user_info']);
        this.snackBar.open('Edit success', 'Close', {
          duration: 3 * 1000,
        });
        this.changeView();
      } else {
        console.log(response.data);
        this.snackBar.open('Error', 'Close', { duration: 3 * 1000 });
      }
    });
  }

  changeView() {
    this.editView = !this.editView;
  }
}
