import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../project';

@Component({
  selector: 'app-dialog-project-delete',
  templateUrl: './dialog-project-delete.component.html',
  styleUrls: ['./dialog-project-delete.component.css'],
})
export class DialogProjectDeleteComponent {
  project: Project;
  durationInSeconds = 3;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogProjectDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.project.delete().then((response) => {
      if (response.hasOwnProperty('project_info'))
        if (typeof this.project.name === 'string')
          this.onDeleteEmitter.emit(this.project.id);
        else {
          if (response.hasOwnProperty('notOwner'))
            this.snackBar.open('You do not own the project', 'Close', {
              duration: this.durationInSeconds * 1000,
            });
          if (response.hasOwnProperty('notExist'))
            this.snackBar.open('Project does not exist', 'Close', {
              duration: this.durationInSeconds * 1000,
            });
          if (response.hasOwnProperty('notAuth'))
            this.snackBar.open('You are not authorized', 'Close', {
              duration: this.durationInSeconds * 1000,
            });
        }
    });
    this.dialogRef.close();
  }
}
