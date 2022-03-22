import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../user';
import UsersList from '../userlist.json';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: any = []
  usersDataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['image', 'username', 'surname', 'name', 'email',
    'expenses'];
  currentScreenSize: string | undefined;
  isSmall = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer,
    breakpointObserver: BreakpointObserver){
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            if(query === Breakpoints.Small || query === Breakpoints.XSmall) {
              this.currentScreenSize = "Is Small " + query;
              this.isSmall = true;
            }
            else {
              this.currentScreenSize = "Not Small " + query;
              this.isSmall = false;
            }
          }
        }
      });
  }

  ngOnInit(): void {
    try {
      this.http.get('http:///127.0.0.1:8000/get_all_users/').subscribe((res) => {
      this.users = User.jsontoList(res);
    });
    } catch (error) {}

    if (this.users.length === 0) { this.users = User.jsontoList(UsersList); }

    this.usersDataSource = new MatTableDataSource<User>(this.users);
  }

  ngAfterViewInit() {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20, this.usersDataSource.data.length]
      .filter(n => n <= this.usersDataSource.data.length);
  }
}
