import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-dialog-leave-project',
  templateUrl: './dialog-leave-project.component.html',
  styleUrls: ['./dialog-leave-project.component.css'],
})
export class DialogLeaveProjectComponent {
  user: User;
  project: Project;
  @Output() onLeaveEmitter = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogLeaveProjectComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.project = data.project;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLeave(): void {
    if (this.user.id != null)
      this.project.expellMember(this.user.id).then((response) => {
        if ('project_member_info' in response) this.onLeaveEmitter.emit();
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
      });
    this.dialogRef.close();
  }
}
