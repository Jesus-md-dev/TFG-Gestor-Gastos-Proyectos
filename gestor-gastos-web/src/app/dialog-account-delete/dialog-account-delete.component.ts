import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';

@Component({
  selector: 'app-dialog-account-delete',
  templateUrl: './dialog-account-delete.component.html',
  styleUrls: ['./dialog-account-delete.component.css']
})
export class DialogAccountDeleteComponent {
  user: User;
  @Output() onDeleteEmitter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogAccountDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.user.delete().then((response) => {
      if (response.hasOwnProperty('user_info'))
          this.onDeleteEmitter.emit();
      else if (response.hasOwnProperty('message'))
        this.snackBar.open('Unable to delete this account', 'Close', {
          duration: 3 * 1000,
        });
      else
        this.snackBar.open('An error has produced during the process', 'Close', {
          duration: 3 * 1000,
        });
    });
    this.dialogRef.close();
  }
}
