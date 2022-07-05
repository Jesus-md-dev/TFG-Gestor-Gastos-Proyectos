import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from '../expense';

@Component({
  selector: 'app-user-expenses-table',
  templateUrl: './user-expenses-table.component.html',
  styleUrls: ['./user-expenses-table.component.css'],
})
export class UserExpensesTableComponent implements OnInit {
  @Input()
  expenses: Expense[] = [];
  finalAmount: number = 0;
  finalAmountMoth: number = 0;
  expensesDataSource = new MatTableDataSource<Expense>();
  displayedColumns: string[] = [
    'amount',
    'vatpercentage',
    'final_amount',
    'dossier',
    'date',
    'showBtn',
  ];

  constructor() {
    this.expensesDataSource.filterPredicate = ((data, filter) => {
      let filterJs = JSON.parse(filter);
      const a =
        !filterJs.user || data.user.toLowerCase().includes(filterJs.user);
      // const b = !filterJs.date || data.date?.toLowerCase().includes(filterJs.date);
      return a;
    }) as (data: Expense, filter: string) => boolean;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    let currentDate = new Date();
    this.expenses.forEach((expense) => {
      this.finalAmount += expense.final_amount;
      if (expense.date.getMonth() == currentDate.getMonth()) {
        this.finalAmountMoth += expense.final_amount;
      }
    });
    this.expensesDataSource.data = this.expenses;
    this.expensesDataSource.sort = this.sort;
  }
}
