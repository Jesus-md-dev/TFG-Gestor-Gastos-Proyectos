import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { maxDateValidator } from 'custom-validators.directive';
import { FileManagerService } from '../file-manager.service';
import { IncomeService } from '../income.service';
import { User } from '../user';

@Component({
  selector: 'app-dialog-create-income',
  templateUrl: './dialog-create-income.component.html',
  styleUrls: ['./dialog-create-income.component.css'],
})
export class DialogCreateIncomeComponent {
  projectId: number;
  admin: User;
  users: User[] = [];
  fileManagerService = new FileManagerService();
  formGroup: FormGroup = new FormGroup({
    date: new FormControl('', [
      Validators.required,
      maxDateValidator(new Date()),
    ]),
    concept: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });
  @Output() onCreateEmmiter = new EventEmitter();
  selectedFile: File | null = null;
  selectedFileName: String | null = null;

  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date < new Date();
  };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateIncomeComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
    this.admin = data.admin;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createIncome(): void {
    if (this.formGroup.valid) {
      IncomeService.create(
        this.projectId,
        this.selectedFile,
        this.formGroup.controls['date'].value,
        this.formGroup.controls['concept'].value,
        this.formGroup.controls['amount'].value,
      ).then((response) => {
        if ('message' in response) {
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

  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.fileManagerService.fixFileName(
        event.target.files[0]['name']
      );
    }
  }
}
