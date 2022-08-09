import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    public translate: TranslateService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.income = data.income;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    if (this.income.id != null) {
      IncomeService.delete(this.income.id).then((response) => {
        if ('income_info' in response) {
          this.onDeleteEmitter.emit();
          this.snackBar.open(
            this.translate.instant('Income') +
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
