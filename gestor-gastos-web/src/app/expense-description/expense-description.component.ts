import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-description',
  templateUrl: './expense-description.component.html',
  styleUrls: ['./expense-description.component.css'],
})
export class ExpenseDescriptionComponent implements OnInit {
  @Input()
  expenseId: number | null = null;
  expense: Expense = new Expense();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.expenseId != null)
      Expense.load(this.expenseId).then((response) => {
        if (response.hasOwnProperty('expense_info')) {
          this.expense = Expense.jsontoObject(response['expense_info']);
        } else if (response.hasOwnProperty('message')) {
          this.snackBar.open('Can not load expense data', 'Close', {
            duration: 3 * 1000,
          });
        } else {
          this.snackBar.open('Error', 'Close', {
            duration: 3 * 1000,
          });
        }
      });
  }
}
