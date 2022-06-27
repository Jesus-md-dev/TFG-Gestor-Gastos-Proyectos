import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { maxDateValidator } from 'custom-validators.directive';
import { ExpenseService } from '../expense.service';
import { ProjectService } from '../project.service';
import { User } from '../user';
import { FileManagerService } from '../file-manager.service';
import { Project } from '../project';

@Component({
  selector: 'app-dialog-create-expense',
  templateUrl: './dialog-create-expense.component.html',
  styleUrls: ['./dialog-create-expense.component.css'],
})
export class DialogCreateExpenseComponent implements OnInit {
  projectId: number;
  admin: User;
  users: User[] = [];
  fileManagerService = new FileManagerService();
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    date: new FormControl('', [
      Validators.required,
      maxDateValidator(new Date()),
    ]),
    concept: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    vatpercentage: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
    ]),
  });
  @Output() onCreateEmmiter = new EventEmitter();
  selectedFile: File | null = null;
  selectedFileName: String | null = null;

  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date < new Date();
  };

  constructor(
    public dialogRef: MatDialogRef<DialogCreateExpenseComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
    this.admin = data.admin;
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  createExpense(): void {
    if (this.formGroup.valid) {
      ExpenseService.create(
        this.projectId,
        this.formGroup.controls['username'].value,
        this.selectedFile,
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

  loadUserList() {
    ProjectService.getProjectMembers(this.projectId).then((response) => {
      this.users = response;
      this.users.push(this.admin);
      this.users.sort((a, b) =>
        a.username.toLowerCase() > b.username.toLowerCase()
          ? 1
          : b.username.toLowerCase() > a.username.toLowerCase()
          ? -1
          : 0
      );
    });
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

