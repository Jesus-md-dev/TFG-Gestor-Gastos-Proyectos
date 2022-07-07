import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-expeneses-months',
  templateUrl: './chart-expeneses-months.component.html',
  styleUrls: ['./chart-expeneses-months.component.css'],
})
export class ChartExpenesesMonthsComponent {
  @Input()
  year = '';
  @Input()
  data: {
    name: string;
    value: number;
  }[] = [];
  showXAxis = true;
  showYAxis = true;

  formatEuros(val: number) {
    return val + '€';
  }
}
