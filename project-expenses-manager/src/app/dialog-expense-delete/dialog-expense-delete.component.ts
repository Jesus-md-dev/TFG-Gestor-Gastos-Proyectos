import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Expense } from '../expense';

@Component({
  selector: 'app-dialog-expense-delete',
  templateUrl: './dialog-expense-delete.component.html',
  styleUrls: ['./dialog-expense-delete.component.css'],
})
export class DialogExpenseDeleteComponent {
  expense: Expense;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogExpenseDeleteComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expense = data.expense as Expense;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.expense.id != null) {
      this.expense.delete().then((response) => {
        if ('expense_info' in response) {
          this.onDeleteEmitter.emit();
          this.snackBar.open(
            this.translate.instant('Expense') +
              ' ' +
              this.translate.instant('deleted'),
            this.translate.instant('Close'),
            { duration: 3 * 1000 }
          );
        }
        else if ('message' in response) {
          this.snackBar.open(this.translate.instant('unable delete'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
      });
      this.dialogRef.close();
    }
  }
}
