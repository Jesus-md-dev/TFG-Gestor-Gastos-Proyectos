import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../user';

@Component({
  selector: 'app-dialog-account-delete',
  templateUrl: './dialog-account-delete.component.html',
  styleUrls: ['./dialog-account-delete.component.css'],
})
export class DialogAccountDeleteComponent {
  user: User;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAccountDeleteComponent>,
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.user.delete().then((response) => {
      if ('user_info' in response) this.onDeleteEmitter.emit();
      else if ('message' in response)
        this.snackBar.open(
          this.translate.instant('unable delete'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
      else
        this.snackBar.open(
          this.translate.instant('system error'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
    });
    this.dialogRef.close();
  }
}
