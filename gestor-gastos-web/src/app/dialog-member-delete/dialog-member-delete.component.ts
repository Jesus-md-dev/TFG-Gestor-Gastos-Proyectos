import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-dialog-member-delete',
  templateUrl: './dialog-member-delete.component.html',
  styleUrls: ['./dialog-member-delete.component.css'],
})
export class DialogMemberDeleteComponent {
  project: Project;
  user: User;
  durationInSeconds = 3;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogMemberDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.project = data.project;
    this.user = data.user;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.project.id != null && this.user.id != null) {
      this.project.expellMember(this.project.id, this.user.id).then((response) => {
        if (!response.hasOwnProperty('message')) this.onDeleteEmitter.emit();
      });
    }
    this.dialogRef.close();
  }
}
