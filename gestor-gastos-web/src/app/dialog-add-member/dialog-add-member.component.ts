import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existOnListValidator } from 'custom-validators.directive';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { Project } from '../project';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.css'],
})
export class DialogAddMemberComponent implements OnInit {
  userlist: string[] = [];
  project: Project;
  projectMembers: string[];
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogProjectDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.project = data.project;
    this.projectMembers = data.projectMembers;
    console.log(this.projectMembers);

    this.formGroup = new FormGroup({
      username: new FormControl('', [
        existOnListValidator(this.userlist, 'isOnList'),
        existOnListValidator(this.projectMembers, 'isOnProject'),
      ]),
    });
  }

  ngOnInit(): void {}

  onAdd(): void {
    if (
      this.formGroup.valid &&
      this.formGroup.get('username')?.value != '' &&
      this.formGroup.get('username')?.value != null
    ) {
      let username = this.formGroup.get('username')?.value;
      UserService.userExist(username).then((response) => {
        console.log(response);

        if (
          response.hasOwnProperty('error') &&
          (response['error'] == 'user does not exist' ||
            response['error'] == 'not found')
        ) {
          this.snackBar.open('User' + username + 'not found', 'Close', {
            duration: 3 * 1000,
          });
        } else {
          this.userlist.push(username);
        }
        this.formGroup.reset();
      });
    }
  }

  onDelete(username: string): void {
    this.userlist.splice(this.userlist.indexOf(username), 1);
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close();
  }
}
