import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../user';
import UsersList from '../userlist.json';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    try {
      this.http.get('http:///127.0.0.1:8000/get_all_users/').subscribe((res) => {
      this.users = User.jsontoList(res);
      console.log(res)
    });
    } catch (error) {}

    if (this.users.length === 0) { this.users = User.jsontoList(UsersList); }

    this.usersDataSource = new MatTableDataSource<User>(this.users);
    console.log(this.getPageSizeOptions());
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
