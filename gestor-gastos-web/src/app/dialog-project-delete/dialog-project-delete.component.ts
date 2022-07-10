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
      if ('project_info' in response)
        if (typeof this.project.name === 'string')
          this.onDeleteEmitter.emit(this.project.id);
        else {
          if ('message' in response)
            this.snackBar.open('Unable to delete project', 'Close', {
              duration: 3 * 1000,
            });
        }
    });
    this.dialogRef.close();
  }
}
