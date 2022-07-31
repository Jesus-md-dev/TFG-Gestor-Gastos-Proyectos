import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../project';
import { ProjectService } from '../project.service';
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
      console.log(this.project);
      ProjectService.expellMember(this.project.id, this.user.id)
        .then((response) => {
          if ('project_member_info' in response) this.onDeleteEmitter.emit();
        });
    }
    this.dialogRef.close();
  }
}
