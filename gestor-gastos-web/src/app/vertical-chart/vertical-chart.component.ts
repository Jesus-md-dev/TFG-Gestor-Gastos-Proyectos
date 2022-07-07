import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.css'],
})
export class VerticalChartComponent {
  @Input()
  data: {
    name: string;
    value: number;
  }[] = [];
  @Input()
  year = '';
  showXAxis = true;
  showYAxis = true;

  constructor() {}

  formatEuros(val: number) {
    return val + '€'
  }
}
