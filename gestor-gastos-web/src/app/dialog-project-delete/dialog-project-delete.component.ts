import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../project';

@Component({
  selector: 'app-dialog-project-delete',
  templateUrl: './dialog-project-delete.component.html',
  styleUrls: ['./dialog-project-delete.component.css'],
})
export class DialogProjectDeleteComponent {
  project: Project;
  projectName: string;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogProjectDeleteComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
    this.projectName = data.project.name
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.project.delete().then((response) => {
      if ('project_info' in response)
        if (typeof this.project.name === 'string') {
          this.onDeleteEmitter.emit(this.project.id);
          this.snackBar.open(
            this.translate.instant('Project') +
              ' ' +
              this.projectName +
              ' ' +
              this.translate.instant('deleted'),
            this.translate.instant('Close'),
            { duration: 3 * 1000 }
          );
        }
        else if ('message' in response) {
          this.snackBar.open(this.translate.instant('unable delete'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
    });
    this.dialogRef.close();
  }
}
