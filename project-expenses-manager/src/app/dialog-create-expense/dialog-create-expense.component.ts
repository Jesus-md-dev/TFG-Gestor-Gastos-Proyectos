import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { maxDateValidator } from 'custom-validators.directive';
import { Expense } from '../expense';
import { FileManagerService } from '../file-manager.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-dialog-create-expense',
  templateUrl: './dialog-create-expense.component.html',
  styleUrls: ['./dialog-create-expense.component.css'],
})
export class DialogCreateExpenseComponent implements OnInit {
  projectId: number;
  project: Project = new Project();
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
    private router: Router,
    public translate: TranslateService,
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
      Expense.create(
        this.projectId,
        this.formGroup.controls['username'].value,
        this.selectedFile,
        this.formGroup.controls['date'].value,
        this.formGroup.controls['concept'].value,
        this.formGroup.controls['amount'].value,
        this.formGroup.controls['vatpercentage'].value
      ).then((response) => {
        if ('expense_info' in response) {
          this.onCreateEmmiter.emit();
          this.snackBar.open(
            this.translate.instant('Expense') +
              ' ' +
              this.translate.instant('created'),
            this.translate.instant('Close'),
            { duration: 3 * 1000 }
          );
          this.dialogRef.close();
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else {
          this.snackBar.open(
            this.translate.instant('system error'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
        }
      });
    } else {
      this.snackBar.open(
        'Some fields are not correct',
        this.translate.instant('Close'),
        {
          duration: 3 * 1000,
        }
      );
    }
  }

  loadUserList() {
    Project.load(this.projectId).then((response) => {
      if ('project_info' in response) {
        this.project = Project.jsontoObject(response['project_info']);
        this.project.getMembers().then((response) => {
          if ('members_info' in response) {
            this.users = User.jsontoList(response['members_info']);
            this.users.push(this.admin);
            this.users.sort((a, b) =>
              a.username.toLowerCase() > b.username.toLowerCase()
                ? 1
                : b.username.toLowerCase() > a.username.toLowerCase()
                ? -1
                : 0
            );
          } else
            this.snackBar.open(
              'Error loading members',
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
        });
      } else if ('message' in response) {
        this.snackBar.open(
          this.translate.instant(response['message']),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
      } else {
        this.snackBar.open(
          this.translate.instant('system error'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
        this.router.navigate(['/']);
      }
    });
  }

  onFileSelected(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile?.type.split('/')[1] === 'pdf') {
        this.selectedFileName = this.fileManagerService.fixFileName(
          event.target.files[0]['name']
        );
      } else {
        this.resetFile();
        this.snackBar.open(
          this.translate.instant('not image'),
          this.translate.instant('Close'),
          {
            duration: 3 * 1000,
          }
        );
      }
    }
  }

  resetFile() {
    this.selectedFile = null;
    this.selectedFileName = null;
  }
}

