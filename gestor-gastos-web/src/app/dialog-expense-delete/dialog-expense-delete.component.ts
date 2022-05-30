import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../expense';

@Component({
  selector: 'app-dialog-expense-delete',
  templateUrl: './dialog-expense-delete.component.html',
  styleUrls: ['./dialog-expense-delete.component.css'],
})
export class DialogExpenseDeleteComponent {
  thisIsAnExpense: Expense;
  durationInSeconds = 3;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogExpenseDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.thisIsAnExpense = data.expense;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    console.log(this.thisIsAnExpense.user);
    this.thisIsAnExpense.delete();
    this.dialogRef.close();
  }
}
