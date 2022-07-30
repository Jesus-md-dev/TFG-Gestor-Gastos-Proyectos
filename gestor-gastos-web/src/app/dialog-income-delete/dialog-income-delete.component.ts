import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Income } from '../income';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-dialog-income-delete',
  templateUrl: './dialog-income-delete.component.html',
  styleUrls: ['./dialog-income-delete.component.css'],
})
export class DialogIncomeDeleteComponent {
  income: Income;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogIncomeDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { this.income = data.income as Income; }

  onCancel(): void { this.dialogRef.close(); }

  onDelete(): void {
    if (this.income.id != null) {
      IncomeService.delete(this.income.id).then((response) => {
        if ('income_info' in response) this.onDeleteEmitter.emit();
        else {
          if ('message' in response)
            this.snackBar.open('Unable to delete project', 'Close', {
              duration: 3 * 1000,
            });
        }
      });
      this.dialogRef.close();
    }
  }
}
