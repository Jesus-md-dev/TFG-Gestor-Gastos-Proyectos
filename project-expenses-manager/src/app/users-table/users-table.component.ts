import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';
import { DialogMemberDeleteComponent } from '../dialog-member-delete/dialog-member-delete.component';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { ProjectMemberService } from '../project-member.service';
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
    formBuilder: FormBuilder,
    private translate: TranslateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
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
      } else if ('message' in response) {
        this.snackBar.open(
          this.translate.instant(response['message']),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
        this.router.navigate(['/']);
      } else {
        this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
          duration: 3 * 1000,
        });
        this.router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.paginator._intl.itemsPerPageLabel =
      this.translate.instant('Items per page');
    this.usersDataSource.paginator._intl.previousPageLabel =
      this.translate.instant('Previous page');
    this.usersDataSource.paginator._intl.nextPageLabel =
      this.translate.instant('Next page');
    this.usersDataSource.paginator._intl.firstPageLabel =
      this.translate.instant('First page');
    this.usersDataSource.paginator._intl.lastPageLabel =
      this.translate.instant('Last page');
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
    this.project.getMembers().then((response) => {
      if ('members_info' in response) {
        this.usersDataSource.data = this.users = User.jsontoList(
          response['members_info']
        );
        this.usersDataSource.sort = this.sort;
        const membersList: [] = response['members_info'];
        membersList.forEach((member) => {
          this.isManager[member['username']] = member['is_manager'];
        });
      } else if ('message' in response) {
        this.snackBar.open(
          this.translate.instant(response['message']),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
        this.router.navigate(['/']);
      } else {
        this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
          duration: 3 * 1000,
        });
        this.router.navigate(['/']);
      }
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
          this.snackBar.open(
            username + ' ' + this.translate.instant('promoted to manager'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
      }
    );
  }

  demoteMember(username: string) {
    ProjectMemberService.demoteProjectMembers(this.projectId, username).then(
      (response) => {
        if ('project_member_info' in response) {
          this.isManager[username] = false;
          this.snackBar.open(
            username + ' ' + this.translate.instant('demoted to member'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
      }
    );
  }
}
