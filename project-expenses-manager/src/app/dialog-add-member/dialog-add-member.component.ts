import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { existOnListValidator, isProjectAdminValidator } from 'custom-validators.directive';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { Project } from '../project';
import { User } from '../user';

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
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router
  ) {
    this.project = data.project;
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
      User.exist(username).then((response) => {
        if ('user_info' in response) {
          this.userlist.push(username);
          this.formGroup
            .get('username')
            ?.setValidators([
              existOnListValidator(this.userlist, 'isOnList'),
              existOnListValidator(this.projectMembers, 'isOnProject'),
              isProjectAdminValidator(this.project),
            ]);
        }
        else if ('message' in response)
          this.snackBar.open(
            username + ' ' + this.translate.instant('not found'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        else
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
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
      if ('project_member_info' in response) {
        this.onSaveEmitter.emit();
        this.snackBar.open(
          this.translate.instant('Members') +
            ' ' +
            this.translate.instant('added'),
          this.translate.instant('Close'),
          { duration: 3 * 1000 }
        );
      } else if ('message' in response)
        this.snackBar.open(
          this.translate.instant('users belong to project'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
      else {
        this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
          duration: 3 * 1000,
        });
        this.router.navigate(['/']);
      }
    });
    this.dialogRef.close();
  }
}
