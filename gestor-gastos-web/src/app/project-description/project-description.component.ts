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
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';


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
    'last_name',
    'first_name',
    'email',
    'expenses',
  ];
  currentScreenSize: string | undefined;
  isSmall = false;
  localStorageService = new LocalStorageService();
  filterData: { username: string } = { username: '' };
  filterSelectObj = [];
  readonly formControl: FormGroup;
  private routeSub: Subscription = new Subscription();
  private projectId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    formBuilder: FormBuilder
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

    this.usersDataSource.filterPredicate = ((data, filter) => {
      let filterJs = JSON.parse(filter);
      const a = !filterJs.username || data.username.toLowerCase().includes(filterJs.username);
      const b = !filterJs.last_name || data.last_name?.toLowerCase().includes(filterJs.last_name);
      const c = !filterJs.first_name || data.first_name?.toLowerCase().includes(filterJs.first_name);
      const d = !filterJs.email || data.email?.toLowerCase().includes(filterJs.email);
      return a && b && c && d;
    }) as (data: User, filter: string) => boolean;

    this.formControl = formBuilder.group({
      username: '',
      last_name: '',
      first_name: '',
      email: '',
    });

    this.formControl.valueChanges.subscribe((value) => {
      const filter = JSON.stringify(value);
      this.usersDataSource.filter = filter.toLowerCase();
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
        this.project = response;
      });
    } catch (error) {}
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }
}
