import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '../project.service';
import { User } from '../user';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateExpenseComponent } from '../dialog-create-expense/dialog-create-expense.component';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    try {
      this.routeSub = this.route.params.subscribe((params: { [x: string]: any; }) => {
        this.projectId = params['projectId'];
      });
      ProjectService.loadProjectData(this.projectId).then((response) => {
        this.project = response as Project;
        User.loadUser(this.project.admin).then((response) => {
          this.user = response;
        });
      });
    } catch (error) {}
  }

  createExpense() {
    const ref = this.dialog.open(DialogCreateExpenseComponent, {
      data: {
        projectId: this.projectId,
      },
    });
  }
}
