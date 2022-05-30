import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
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
    'options',
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

    this.expensesDataSource.filterPredicate = ((data, filter) => {
      let filterJs = JSON.parse(filter);
      const a =
        !filterJs.user || data.user.toLowerCase().includes(filterJs.user);
      // const b = !filterJs.date || data.date?.toLowerCase().includes(filterJs.date);
      return a;
    }) as (data: Expense, filter: string) => boolean;

    this.formControl = formBuilder.group({
      user: '',
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
      this.updateExpenseList();
    });
  }

  ngAfterViewInit() {
    this.expensesDataSource.paginator = this.paginator;
  }

  deleteExpense(expense: Expense) {
    const ref = this.dialog.open(DialogExpenseDeleteComponent, {
      data: {
        expense: expense,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.updateExpenseList();
    });
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }

  updateExpenseList() {
    ExpenseService.getProjectExpenses(this.projectId).then((response) => {
      this.expensesDataSource.data = this.expenses = response;
      this.expensesDataSource.sort = this.sort;
    });
  }
}
