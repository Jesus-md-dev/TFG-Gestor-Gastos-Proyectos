import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Input()
  projects: any = [];

  constructor(public dialog: MatDialog) {}

  hasProjects() {
    if (Array.isArray(this.projects))
      if (this.projects.length != 0) return true;
    return false;
  }

  deleteProject(project: Project) {
    const ref = this.dialog.open(ProjectDeleteDialog, {
      data: { project: project },
    });

    ref.componentInstance.onAdd.subscribe((data) => {
      this.projects.splice(
        this.projects.findIndex((element: { id: number }) => element.id === data),
        1
      );
    })
  }
}

@Component({
  selector: 'dialog-project-delete-dialog',
  templateUrl: 'dialog-project-delete-dialog.html',
})
export class ProjectDeleteDialog {
  project: Project;
  durationInSeconds = 3;
  @Output() onAdd = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ProjectDeleteDialog>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.project = data.project; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    this.project.delete().then((response) => {
      if (response.hasOwnProperty('project_info'))
        if (typeof this.project.name === 'string')
          this.onAdd.emit(this.project.id);
      else{
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
    })
    this.dialogRef.close();
  }
}
