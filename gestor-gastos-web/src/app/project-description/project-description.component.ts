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


@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css'],
})
export class ProjectDescriptionComponent implements OnInit {
  users: User[] = [];
  project: any = new Project();
  usersDataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'image',
    'username',
    'surname',
    'name',
    'email',
    'expenses',
  ];
  currentScreenSize: string | undefined;
  isSmall = false;
  localStorageService = new LocalStorageService();
  private routeSub: Subscription = new Subscription();
  private projectId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            if (query === Breakpoints.Small || query === Breakpoints.XSmall) {
              this.currentScreenSize = 'Is Small ' + query;
              this.isSmall = true;
            } else {
              this.currentScreenSize = 'Not Small ' + query;
              this.isSmall = false;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    try {
      this.routeSub = this.route.params.subscribe((params) => {
        this.projectId = params['projectId'];
      });

      ProjectService.getProjectMembers(this.projectId).then((response) => {
        this.users = response;
        this.usersDataSource.data = this.users;
        this.usersDataSource.sort = this.sort;
      });

      ProjectService.loadProjectData(this.projectId).then((response) => {
        console.log(response);
        this.project = response;
      });
    } catch (error) {}
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
  }

  getPageSizeOptions(): number[] {
    // return [5, 10, 15, 20, this.usersDataSource.data.length].filter(
    //   (n) => n <= this.usersDataSource.data.length
    // );
    return [5, 10, 15, 20]
  }
}
