import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent {
  @Input()
  projects: any = [];
  hasProjects() {
    if (Array.isArray(this.projects))
      if (this.projects.length != 0)
        return true;
    return false;
  }
}
