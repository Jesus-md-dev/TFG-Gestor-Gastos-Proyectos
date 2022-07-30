import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { DialogIncomeDeleteComponent } from '../dialog-income-delete/dialog-income-delete.component';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';
import { Income } from '../income';
import { IncomeService } from '../income.service';
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
  incomes: Expense[] = [];
  project: any = new Project();
  expensesDataSource = new MatTableDataSource<Expense>();
  finalAmount: number = 0;
  finalAmountMoth: number = 0;
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

  deleteIncome(expense: Income) {
    const ref = this.dialog.open(DialogIncomeDeleteComponent, {
      data: {
        income: expense,
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
        this.expenses = Expense.jsontoList(response['expenses_info']);
        this.expensesDataSource.data = this.expenses;
        this.expensesDataSource.sort = this.sort;
        IncomeService.getProjectIncomes(this.projectId).then((response) => {
          if ('incomes_info' in response) {
            this.incomes = Expense.jsontoList(response['incomes_info']);
            this.expensesDataSource.data = this.incomes
              .concat(this.expenses)
              .sort((a, b) => (a.date < b.date ? 1 : -1));
            console.log(this.expensesDataSource.data);
            this.expensesDataSource.sort = this.sort;
            let currentDate = new Date();
            this.incomes.forEach((income) => {
              this.finalAmount += income.amount;
              if (income.date.getMonth() == currentDate.getMonth()) {
                this.finalAmountMoth += income.amount;
              }
            });
          } else
            this.snackBar.open('Error loading user incomes', 'Close', {
              duration: 3 * 1000,
            });
        });
        let currentDate = new Date();
        this.expenses.forEach((expense) => {
          this.finalAmount -= expense.final_amount;
          if (expense.date.getMonth() == currentDate.getMonth()) {
            this.finalAmountMoth -= expense.final_amount;
          }
        });
      } else
        this.snackBar.open('Error loading user expenses', 'Close', {
          duration: 3 * 1000,
        });
    });
  }
}
