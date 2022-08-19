import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { maxDateValidator } from 'custom-validators.directive';
import { DialogIncomeDeleteComponent } from '../dialog-income-delete/dialog-income-delete.component';
import { FileManagerService } from '../file-manager.service';
import { Income } from '../income';
import { Project } from '../project';

@Component({
  selector: 'app-income-description',
  templateUrl: './income-description.component.html',
  styleUrls: ['./income-description.component.css'],
})
export class IncomeDescriptionComponent {
  @Input()
  incomeId: number | null = null;
  @Input()
  modify: boolean = false;
  income: Income = new Income();
  fileManagerService = new FileManagerService();
  detailsView: boolean = true;
  incomeUsername: string = '';
  project: Project = new Project();
  formGroup: FormGroup = new FormGroup({
    date: new FormControl('', [
      Validators.required,
      maxDateValidator(new Date()),
    ]),
    concept: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  });
  selectedFile: File | null = null;
  selectedFileName: String | null = null;

  constructor(
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIncome();
  }

  loadIncome() {
    if (this.incomeId != null)
      Income.load(this.incomeId).then((response) => {
        if ('income_info' in response) {
          this.income = Income.jsontoObject(response['income_info']);
          this.loadIncomeProject();
          this.formGroup.controls['concept'].setValue(this.income.concept);
          this.formGroup.controls['date'].setValue(this.income.date);
          this.formGroup.controls['amount'].setValue(this.income.amount);
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
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

  loadIncomeProject() {
    Project.load(this.income.project).then((response) => {
      if ('project_info' in response)
        this.project = Project.jsontoObject(response['project_info']);
    });
  }

  changeView() {
    this.detailsView = !this.detailsView;
  }

  updateIncome() {
    if (this.formGroup.valid) {
      this.income.date = this.formGroup.controls['date'].value;
      this.income.concept = this.formGroup.controls['concept'].value;
      this.income.amount = this.formGroup.controls['amount'].value;
      if (this.selectedFile != null) this.income.dossier = this.selectedFile;
      this.income.update().then((response: any) => {
        if ('income_info' in response) {
          this.resetFile();
          this.income = Income.jsontoObject(response['income_info']);
          this.snackBar.open(
            this.translate.instant('edit success'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.changeView();
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
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
    }
  }

  deleteIncome(income: Income) {
    const ref = this.dialog.open(DialogIncomeDeleteComponent, {
      data: {
        income: income,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.router.navigate(['/project/' + this.income.project]);
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
