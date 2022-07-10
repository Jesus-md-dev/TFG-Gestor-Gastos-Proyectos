import { Component, Input, SimpleChanges } from '@angular/core';
import { Expense } from '../expense';

interface ExpensesUser {
  name: string;
  value: number;
}


@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.css'],
})
export class HorizontalChartComponent {
  @Input()
  expenses: Expense[] = [];
  expensesUserArr: ExpensesUser[] = [];
  data = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
  ];
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Amount expensed';
  showYAxisLabel = true;
  yAxisLabel = 'Members';

  ngOnInit(): void {
    this.expenses.sort((a, b) => (a.user < b.user ? 1 : -1));
    this.expensesUserArr = this.initializeChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expenses = changes['expenses'].currentValue;
    this.ngOnInit();
  }

  formatEuros(val: number) {
    return val + '€';
  }

  initializeChartData() {
    let expensesUser: ExpensesUser[] = [];
    this.expenses.forEach((expense) => {
      let index = expensesUser.findIndex((e) => e.name == expense.user);
      if (index != undefined && index != -1)
        expensesUser[index].value += expense.final_amount;
      else
        expensesUser.push({
          name: expense.user,
          value: expense.final_amount,
        });
    });
    expensesUser.sort((a, b) => (a.value < b.value ? 1 : -1));
    return expensesUser;
  }
}
