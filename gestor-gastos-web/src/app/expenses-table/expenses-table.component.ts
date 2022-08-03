import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { DialogIncomeDeleteComponent } from '../dialog-income-delete/dialog-income-delete.component';
import { Expense } from '../expense';
import { Income } from '../income';
import { Project } from '../project';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent implements OnChanges {
  @Input()
  expenses: Expense[] = [];
  @Input()
  incomes: Expense[] = [];
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

  @Output('parentUpdateExpenseList')
  parentUpdateExpenseList: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'expenses') this.expenses = changes[property].currentValue;
      if (property === 'incomes') this.incomes = changes[property].currentValue;
    }
    this.updateExpenseList();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

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
      this.parentUpdateExpenseList.emit();
    });
  }

  deleteIncome(expense: Income) {
    const ref = this.dialog.open(DialogIncomeDeleteComponent, {
      data: {
        income: expense,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.parentUpdateExpenseList.emit();
    });
  }

  getPageSizeOptions(): number[] { return [5, 10, 15, 20]; }

  updateExpenseList() {
    this.finalAmount = 0;
    this.finalAmountMoth = 0;
    let currentDate = new Date();
    this.incomes.forEach((income) => {
      this.finalAmount += income.amount;
      if (income.date.getMonth() == currentDate.getMonth()) {
        this.finalAmountMoth += income.amount;
      }
    });

    this.expenses.forEach((expense) => {
      this.finalAmount -= expense.final_amount;
      if (expense.date.getMonth() == currentDate.getMonth()) {
        this.finalAmountMoth -= expense.final_amount;
      }
    });

    this.expensesDataSource.data = this.incomes
      .concat(this.expenses)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    this.expensesDataSource.sort = this.sort;
  }
}
