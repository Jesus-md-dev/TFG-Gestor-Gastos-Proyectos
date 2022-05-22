import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { User } from '../user';


@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css'],
})
export class ProjectDescriptionComponent implements OnInit {
  project: Project = new Project();
  localStorageService = new LocalStorageService();
  routeSub: Subscription = new Subscription();
  projectId: any;
  user: User = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    try {
      this.routeSub = this.route.params.subscribe((params) => {
        this.projectId = params['projectId'];
      });
      ProjectService.loadProjectData(this.projectId).then((response) => {
        this.project = response;
        User.loadUser(this.project.admin).then((response) => {
          this.user = response;
        });
      });
    } catch (error) {}
  }
}
