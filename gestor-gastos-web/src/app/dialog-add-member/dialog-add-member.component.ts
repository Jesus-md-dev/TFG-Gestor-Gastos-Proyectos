import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existOnListValidator, isProjectAdminValidator } from 'custom-validators.directive';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { Project } from '../project';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.css'],
})
export class DialogAddMemberComponent implements OnInit {
  userlist: string[] = [];
  project: Project = new Project();
  projectMembers: string[];
  formGroup: FormGroup;
  @Output() onSaveEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogProjectDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    this.project = Project.jsontoObject(data.project['project_info']);
    this.projectMembers = data.projectMembers;

    this.formGroup = new FormGroup({
      username: new FormControl('', [
        existOnListValidator(this.userlist, 'isOnList'),
        existOnListValidator(this.projectMembers, 'isOnProject'),
        isProjectAdminValidator(this.project),
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
        if ('message' in response) {
          this.snackBar.open('User ' + username + ' not found', 'Close', {
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
    this.project.addMembers(this.userlist).then((response) => {
      if ('message' in response) {
        this.snackBar.open('Some users already belong to the project', 'Close', {
          duration: 3 * 1000,
        })
      }
      else{
        this.onSaveEmitter.emit();
      }
    });
    this.dialogRef.close();
  }
}
