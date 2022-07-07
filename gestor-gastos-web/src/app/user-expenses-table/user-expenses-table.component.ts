import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  // readonly formControl: FormGroup;
  @Input()
  expenses: Expense[] = [];
  finalAmount: number = 0;
  finalAmountMoth: number = 0;
  expensesDataSource = new MatTableDataSource<Expense>();
  yearSelected = 2022;
  displayedColumns: string[] = [
    'amount',
    'vatpercentage',
    'final_amount',
    'dossier',
    'date',
    'showBtn',
  ];

  constructor(formBuilder: FormBuilder) {
    // this.expensesDataSource.filterPredicate = ((data, filter) => {
    //   let filterJs = JSON.parse(filter);
    //   const a =
    //     !filterJs.user || data.user.toLowerCase().includes(filterJs.user);
    //   // const b = !filterJs.date || data.date?.toLowerCase().includes(filterJs.date);
    //   return a;
    // }) as (data: Expense, filter: string) => boolean;
    // this.formControl = formBuilder.group({
    //   user: '',
    // });
    // this.formControl.valueChanges.subscribe((value) => {
    //   const filter = JSON.stringify(value);
    //   this.expensesDataSource.filter = filter.toLowerCase();
    // });
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

  ngAfterViewInit() {
    this.expensesDataSource.paginator = this.paginator;
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }  
}