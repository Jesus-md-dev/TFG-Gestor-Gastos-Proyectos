import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../expense';

@Component({
  selector: 'app-expense-description',
  templateUrl: './expense-description.component.html',
  styleUrls: ['./expense-description.component.css']
})
export class ExpenseDescriptionComponent implements OnInit {
  @Input()
  expense: Expense = new Expense();

  constructor() { }

  ngOnInit(): void {
  }

}
