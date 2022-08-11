import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { maxDateValidator } from 'custom-validators.directive';
import { FileManagerService } from '../file-manager.service';
import { Income } from '../income';

@Component({
  selector: 'app-dialog-create-income',
  templateUrl: './dialog-create-income.component.html',
  styleUrls: ['./dialog-create-income.component.css'],
})
export class DialogCreateIncomeComponent {
  projectId: number;
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
    public translate: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectId = data.projectId;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async createIncome() {
    if (this.formGroup.valid) {
      Income.create(
        this.projectId,
        this.selectedFile,
        this.formGroup.controls['date'].value,
        this.formGroup.controls['concept'].value,
        this.formGroup.controls['amount'].value
      ).then((response) => {
        if ('income_info' in response) {
          this.onCreateEmmiter.emit();
          this.snackBar.open(
            this.translate.instant('Income') +
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
        this.translate.instant('some fields not correct'),
        this.translate.instant('Close'),
        {
          duration: 3 * 1000,
        }
      );
    }
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
