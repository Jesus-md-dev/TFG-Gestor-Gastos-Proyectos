import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from '../expense.service';
import { ProjectService } from '../project.service';
import { User } from '../user';

@Component({
  selector: 'app-dialog-create-expense',
  templateUrl: './dialog-create-expense.component.html',
  styleUrls: ['./dialog-create-expense.component.css'],
})
export class DialogCreateExpenseComponent implements OnInit {
  projectId: number;
  users: User[] = [];
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    dossier: new FormControl('', [Validators.required]),
    // TODO max date today
    date: new FormControl('', [Validators.required]),
    concept: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    vatpercentage: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
    ]),
  });
  @Output() onCreateEmmiter = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogCreateExpenseComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
  }

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }

  createExpense(): void {
    if (this.formGroup.valid) {
      ExpenseService.create(
        this.projectId,
        this.formGroup.controls['username'].value,
        this.formGroup.controls['dossier'].value,
        this.formGroup.controls['date'].value,
        this.formGroup.controls['concept'].value,
        this.formGroup.controls['amount'].value,
        this.formGroup.controls['vatpercentage'].value
      ).then((response) => {
        if (response.hasOwnProperty('message')) {
          this.snackBar.open('Error', 'Close', {
            duration: 3 * 1000,
          });
        } else {
          this.onCreateEmmiter.emit();
          this.dialogRef.close();
        }
      });
    } else {
      this.snackBar.open('Some fields are not correct', 'Close', {
        duration: 3 * 1000,
      });
    }
  }

  updateUserList() {
    ProjectService.getProjectMembers(this.projectId).then((response) => {
      this.users = response;
    });
  }
}
