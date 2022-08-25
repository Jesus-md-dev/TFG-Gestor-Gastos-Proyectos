import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Expense } from '../expense';
import { LocalStorageService } from '../local-storage.service';

interface ExpensesMonth {
  name: string;
  value: number;
}

@Component({
  selector: 'app-chart-expeneses-months',
  templateUrl: './chart-expeneses-months.component.html',
  styleUrls: ['./chart-expeneses-months.component.css'],
})
export class ChartExpenesesMonthsComponent implements OnInit {
  @Input()
  expenses: Expense[] = [];
  localStorageService = new LocalStorageService();
  expensesByMonth: ExpensesMonth[] = this.initializeMonths();
  yearSelected = new Date().getFullYear();
  years: number[] = [];
  showXAxis = true;
  showYAxis = true;

  ngOnInit(): void {
    this.initializeExpensesYear();
    this.initializeYears();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expenses = changes['expenses'].currentValue;
    this.ngOnInit();
  }

  formatEuros(val: number) {
    return val + '€';
  }

  initializeYears() {
    this.years = [];
    this.expenses.forEach((expense) => {
      if (this.years.indexOf(expense.date.getFullYear()) === -1) {
        this.years.push(expense.date.getFullYear());
      }
    });
    this.years.sort((a, b) => (a < b ? 1 : -1));
  }

  initializeMonths() {
    let expensesMonth: ExpensesMonth[] = [];
    let date = new Date();
    for (let index = 0; index < 12; index++) {
      date.setMonth(index);
      let lang = this.localStorageService.get('language');
      if (lang == null) lang = 'default'
      let monthStr: String = date.toLocaleString(lang, {
        month: 'long',
      });
      monthStr = monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
      expensesMonth.push({
        name: monthStr,
        value: 0,
      } as ExpensesMonth);
    }
    return expensesMonth;
  }

  initializeExpensesYear() {
    this.expensesByMonth = this.initializeMonths();
    let expensesYear = this.expenses.filter((expense) => {
      return expense.date.getFullYear() === this.yearSelected;
    });
    expensesYear = expensesYear.sort((a, b) => (a.date > b.date ? 1 : -1));
    let expensesYearMonth: number[] = [];
    expensesYear.forEach((expense) => {
      if (!(expense.date.getMonth() in expensesYearMonth))
        expensesYearMonth[expense.date.getMonth()] = 0;
      expensesYearMonth[expense.date.getMonth()] += expense.final_amount;
    });
    expensesYearMonth.forEach((amount, month) => {
      this.expensesByMonth[month]['value'] = amount;
    });
  }

  selectYear(year: any) {
    this.yearSelected = Number(year);
    this.initializeExpensesYear();
  }
}
