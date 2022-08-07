import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { LocalStorageService } from '../local-storage.service';
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
  managedProjects: any = [];
  @Input()
  memberProjects: any = [];
  localStorageService = new LocalStorageService();

  constructor(public dialog: MatDialog) {}

  hasProjects() {
    if (Array.isArray(this.ownProjects))
      if (this.ownProjects.length != 0) return true;
    if (Array.isArray(this.managedProjects))
      if (this.managedProjects.length != 0) return true;
    return false;
  }

  deleteProject(project: Project) {
    const ref = this.dialog.open(DialogProjectDeleteComponent, {
      data: { project: project },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.ownProjects.splice(
        this.ownProjects.findIndex(
          (element: { id: number }) => element.id == data
        ),
        1
      );
    });
  }
}
