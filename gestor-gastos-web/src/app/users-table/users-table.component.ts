import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';
import { DialogMemberDeleteComponent } from '../dialog-member-delete/dialog-member-delete.component';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { ProjectMemberService } from '../project-member.service';
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
  localStorageService = new LocalStorageService();
  username = this.localStorageService.get('username');
  users: User[] = [];
  project: Project = new Project();
  usersDataSource = new MatTableDataSource<User>();
  filterData: { username: string } = { username: '' };
  filterSelectObj = [];
  currentScreenSize: string | undefined;
  isSmall = false;
  isManager: { [key: string]: boolean } = {};
  displayedColumns: string[] = [
    'manager',
    'image',
    'username',
    'last_name',
    'first_name',
    'email',
    'expensesBtn',
    'expellBtn',
  ];

  constructor(
    breakpointObserver: BreakpointObserver,
    formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
    Project.load(this.projectId).then((response) => {
      if ('project_info' in response) {
        this.project = Project.jsontoObject(response['project_info']);
        this.updateUserList();
      }
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
      if ('members_info' in response) {
        this.usersDataSource.data = this.users = User.jsontoList(
          response['members_info']
        );
        this.usersDataSource.sort = this.sort;
        const membersList: [] = response['members_info'];
        membersList.forEach((member) => {
          this.isManager[member['username']] = member['is_manager'];
        });
      } else
        this.snackBar.open('Error loading members', 'Close', {
          duration: 3 * 1000,
        });
    });
  }

  onChangeCheckbox(e: any, username: string) {
    if (e.checked) this.promoteMember(username);
    else this.demoteMember(username);
  }

  promoteMember(username: string) {
    ProjectMemberService.promoteProjectMembers(this.projectId, username).then(
      (response) => {
        if ('project_member_info' in response) {
          this.isManager[username] = true;
          this.snackBar.open(username + ' promoted to manager', 'Close', {
            duration: 3 * 1000,
          });
        } else
          this.snackBar.open('Error promoting member', 'Close', {
            duration: 3 * 1000,
          });
      }
    );
  }

  demoteMember(username: string) {
    ProjectMemberService.demoteProjectMembers(this.projectId, username).then(
      (response) => {
        if ('project_member_info' in response) {
          this.isManager[username] = false;
          this.snackBar.open(username + ' demoted', 'Close', {
            duration: 3 * 1000,
          });
        } else
          this.snackBar.open('Error demoting member', 'Close', {
            duration: 3 * 1000,
          });
      }
    );
  }
}
