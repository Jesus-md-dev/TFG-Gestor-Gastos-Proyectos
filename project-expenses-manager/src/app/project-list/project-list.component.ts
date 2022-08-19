import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogLeaveProjectComponent } from '../dialog-leave-project/dialog-leave-project.component';
import { DialogProjectDeleteComponent } from '../dialog-project-delete/dialog-project-delete.component';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  @Input()
  ownProjects: any = [];
  @Input()
  managedProjects: any = [];
  @Input()
  memberProjects: any = [];
  localStorageService = new LocalStorageService();
  user: User = new User();

  constructor(
    public translate: TranslateService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    if (this.localStorageService.get('username') != null) {
      User.loadUser(this.localStorageService.get('username') as string).then(
        (response) => {
          if ('user_info' in response)
            this.user = User.jsontoObject(response['user_info']);
          else if ('message' in response) {
            this.snackBar.open(
              this.translate.instant(response['message']),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(
              this.translate.instant('system error'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  hasProjects() {
    if (Array.isArray(this.ownProjects))
      if (this.ownProjects.length != 0) return true;
    if (Array.isArray(this.managedProjects))
      if (this.managedProjects.length != 0) return true;
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
          (element: { id: number }) => element.id == data
        ),
        1
      );
    });
  }

  leaveProject(project: Project) {
    const ref = this.dialog.open(DialogLeaveProjectComponent, {
      data: {
        user: this.user,
        project: project
      },
    });
    ref.componentInstance.onLeaveEmitter.subscribe((data) => {
      this.managedProjects.splice(
        this.managedProjects.findIndex(
          (element: { id: number }) => element.id == project.id
        ),
        1
      );
      this.memberProjects.splice(
        this.memberProjects.findIndex(
          (element: { id: number }) => element.id == project.id
        ),
        1
      );
    });
  }
}
