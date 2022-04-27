import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    const dialogRef = this.dialog.open(ProjectDeleteDialog, {
      data: { project: project},
    });
  }
}

@Component({
  selector: 'dialog-project-delete-dialog',
  templateUrl: 'dialog-project-delete-dialog.html',
})
export class ProjectDeleteDialog {
  project: Project;
  constructor(
    public dialogRef: MatDialogRef<ProjectDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.project = data.project; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.project.delete()
    this.dialogRef.close();
  }
}
