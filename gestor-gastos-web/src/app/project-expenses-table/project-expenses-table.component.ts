import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-expenses-table',
  templateUrl: './project-expenses-table.component.html',
  styleUrls: ['./project-expenses-table.component.css'],
})
export class ProjectExpensesTableComponent implements OnInit {
  readonly formControl: FormGroup;
  @Input()
  projectId: any;
  expenses: Expense[] = [];
  project: any = new Project();
  expensesDataSource = new MatTableDataSource<Expense>();
  displayedColumns: string[] = [
    'user',
    'dossier',
    'date',
    'amount',
    'vatpercentage',
    'final_amount',
  ];
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
      .subscribe((result: { breakpoints: { [x: string]: any; }; }) => {
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

    // this.expensesDataSource.filterPredicate = ((data, filter) => {
    //   let filterJs = JSON.parse(filter);
    //   const a = !filterJs.user || data.user.toLowerCase().includes(filterJs.user);
    //   const b = !filterJs.date || data.date?.toLowerCase().includes(filterJs.date);
    //   const c = !filterJs.amount || data.amount?.toLowerCase().includes(filterJs.amount);
    //   const d = !filterJs.vatpercentage ||
    //     data.vatpercentage?.toLowerCase().includes(filterJs.vatpercentage);
    //   const e = !filterJs.final_amount ||
    //     data.final_amount?.toLowerCase().includes(filterJs.final_amount);
    //   return a && b && c && d;
    // }) as (data: Expense, filter: string) => boolean;

    this.formControl = formBuilder.group({
      username: '',
      last_name: '',
      first_name: '',
      email: '',
    });

    this.formControl.valueChanges.subscribe((value) => {
      const filter = JSON.stringify(value);
      this.expensesDataSource.filter = filter.toLowerCase();
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
    this.expensesDataSource.paginator = this.paginator;
  }

  // addMembers() {
  //   const usernames = this.users.map((user) => user.username);
  //   const ref = this.dialog.open(DialogAddMemberComponent, {
  //     data: {
  //       project: this.project,
  //       projectMembers: usernames,
  //     },
  //   });
  //   ref.componentInstance.onSaveEmitter.subscribe((data) => {
  //     this.updateUserList();
  //   });
  // }

  // expellMember(user: User) {
  //   const ref = this.dialog.open(DialogMemberDeleteComponent, {
  //     data: {
  //       project: this.project,
  //       user: user,
  //     },
  //   });
  //   ref.componentInstance.onDeleteEmitter.subscribe((data) => {
  //     this.updateUserList();
  //   });
  // }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }

  updateUserList() {
    ExpenseService.getProjectExpenses(this.projectId).then((response) => {
      this.expensesDataSource.data = this.expenses = response;
      this.expensesDataSource.sort = this.sort;
    });
  }
}
