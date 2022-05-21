import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css'],
})
export class ProjectDescriptionComponent implements OnInit {
  project: any = new Project();

  localStorageService = new LocalStorageService();
  routeSub: Subscription = new Subscription();
  projectId: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    try {
      this.routeSub = this.route.params.subscribe((params) => {
        this.projectId = params['projectId'];
      });
      ProjectService.loadProjectData(this.projectId).then((response) => {
        this.project = response;
      });
    } catch (error) {}
  }
}
