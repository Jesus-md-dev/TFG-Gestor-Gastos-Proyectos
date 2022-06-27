import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { Project } from '../project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Input()
  ownProjects: any = [];
  @Input()
  memberProjects: any = [];

  constructor(public dialog: MatDialog) {}

  hasProjects() {
    if (Array.isArray(this.ownProjects))
      if (this.ownProjects.length != 0) return true;
    if (Array.isArray(this.memberProjects))
      if (this.memberProjects.length != 0) return true;
    return false;
  }

  deleteProject(project: Project) {
    const ref = this.dialog.open(DialogProjectDeleteComponent, {
      data: { project: project },
    });

    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.ownProjects.splice(
        this.ownProjects.findIndex(
          (element: { id: number }) => element.id == data),
        1
      );
    });
  }
}
