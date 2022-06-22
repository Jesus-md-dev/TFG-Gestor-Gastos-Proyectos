import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';
import { DialogMemberDeleteComponent } from '../dialog-member-delete/dialog-member-delete.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { User } from '../user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  readonly formControl: FormGroup;
  @Input()
  projectId: any;
  users: User[] = [];
  project: any = new Project();
  usersDataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'image',
    'username',
    'last_name',
    'first_name',
    'email',
    'expensesBtn',
    'expellBtn'
  ];
  filterData: { username: string } = { username: '' };
  filterSelectObj = [];
  currentScreenSize: string | undefined;
  isSmall = false;

  constructor(
    breakpointObserver: BreakpointObserver,
    formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result: { breakpoints: { [x: string]: any } }) => {
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
      const a =
        !filterJs.username ||
        data.username.toLowerCase().includes(filterJs.username);
      const b =
        !filterJs.last_name ||
        data.last_name?.toLowerCase().includes(filterJs.last_name);
      const c =
        !filterJs.first_name ||
        data.first_name?.toLowerCase().includes(filterJs.first_name);
      const d =
        !filterJs.email || data.email?.toLowerCase().includes(filterJs.email);
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    ProjectService.loadProjectData(this.projectId).then((response) => {
      this.project = response;
      this.updateUserList();
    });
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
  }

  addMembers() {
    let usernames: string[] = [];
    if (this.users.length > 0)
      usernames = this.users.map((user) => user.username);
    const ref = this.dialog.open(DialogAddMemberComponent, {
      data: {
        project: this.project,
        projectMembers: usernames,
      },
    });
    ref.componentInstance.onSaveEmitter.subscribe((data) => {
      this.updateUserList();
    });
  }

  expellMember(user: User) {
    const ref = this.dialog.open(DialogMemberDeleteComponent, {
      data: {
        project: this.project,
        user: user,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.updateUserList();
    });
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }

  updateUserList() {
    ProjectService.getProjectMembers(this.projectId).then((response) => {
      this.usersDataSource.data = this.users = response;
      this.usersDataSource.sort = this.sort;
    });
  }
}
