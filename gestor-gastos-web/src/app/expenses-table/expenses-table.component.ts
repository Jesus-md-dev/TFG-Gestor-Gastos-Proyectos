import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { Project } from '../project';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent implements OnInit {
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
    'showBtn',
    'deleteBtn',
  ];

  constructor(
    formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
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
    Project.load(this.projectId).then((response) => {
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
      if ('expenses_info' in response) {
        this.expensesDataSource.data = this.expenses = Expense.jsontoList(
          response['expenses_info']
        );
        this.expensesDataSource.sort = this.sort;
      } else
        this.snackBar.open('Error loading user expenses', 'Close', {
          duration: 3 * 1000,
        });
    });
  }
}
