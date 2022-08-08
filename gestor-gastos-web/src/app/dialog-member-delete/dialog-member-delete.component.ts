import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-dialog-member-delete',
  templateUrl: './dialog-member-delete.component.html',
  styleUrls: ['./dialog-member-delete.component.css'],
})
export class DialogMemberDeleteComponent {
  project: Project = new Project();
  user: User = new User();
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogMemberDeleteComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project as Project;
    this.user = data.user;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.project.id != null && this.user.id != null) {
      this.project.expellMember(this.user.id).then(
        (response) => {
          if ('project_member_info' in response) {
            this.onDeleteEmitter.emit();
            this.snackBar.open(
              this.translate.instant('Memeber') +
                ' ' +
                this.translate.instant('expelled'),
              this.translate.instant('Close'),
              { duration: 3 * 1000 }
            );
          }
          else if ('message' in response) {
            this.snackBar.open(
              this.translate.instant(response['message']),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
          } else {
            this.snackBar.open(
              this.translate.instant('system error'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
          }
        }
      );
    }
    this.dialogRef.close();
  }
}
