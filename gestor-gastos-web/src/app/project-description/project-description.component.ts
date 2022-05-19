import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../project';
import { User } from '../user';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';


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
