import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-vertical-chart',
  templateUrl: './vertical-chart.component.html',
  styleUrls: ['./vertical-chart.component.css'],
})
export class VerticalChartComponent implements OnInit {
  @Input()
  data: {
    name: string;
    value: number;
  }[] = [];
  @Input()
  year = '';

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = this.year;
  showYAxisLabel = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
    this.xAxisLabel = this.year;
  }

  formatEuros(val: number) {
    return val + '€'
  }
}
