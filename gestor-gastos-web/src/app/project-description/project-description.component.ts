import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../project';
import { User } from '../user';
import UsersList from '../userlist.json';
import ProjectList from '../projectlist.json';
import axios from 'axios';
import { GlobalComponent } from '../global-component';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.css'],
})
export class ProjectDescriptionComponent implements OnInit {
  users: User[] = [];
  project: Project = new Project();
  usersDataSource = new MatTableDataSource<User>([]);
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
    private http: HttpClient,
    private _liveAnnouncer: LiveAnnouncer,
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
      axios
        .get(GlobalComponent.apiUrl + '/api/users', {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        })
        .then(
          (response) => {
            this.users = User.jsontoList(response['data']);
            this.usersDataSource = new MatTableDataSource<User>(this.users);
          },
        );
      axios
        .get(
          GlobalComponent.apiUrl +
            '/api/project/' + this.projectId,
          {
            headers: {
              Authorization: 'Token ' + this.localStorageService.get('token'),
            },
          }
        )
        .then(
          (response) => {
            this.project = Project.jsontoObject(response['data']['project_info']);
          },
        );
    } catch (error) {}
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  ngOnDestroy(): void {

  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20, this.usersDataSource.data.length].filter(
      (n) => n <= this.usersDataSource.data.length
    );
  }
}
