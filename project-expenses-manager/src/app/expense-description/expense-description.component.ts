import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { maxDateValidator } from 'custom-validators.directive';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { Expense } from '../expense';
import { FileManagerService } from '../file-manager.service';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-expense-description',
  templateUrl: './expense-description.component.html',
  styleUrls: ['./expense-description.component.css'],
})
export class ExpenseDescriptionComponent {
  @Input()
  expenseId: number | null = null;
  @Input()
  modify: boolean = false;
  isAuthorized: boolean = false;
  localStorageService = new LocalStorageService();
  expense: Expense = new Expense();
  fileManagerService = new FileManagerService();
  detailsView: boolean = true;
  expenseUser: User = new User();
  expenseUsername: string = '';
  users: User[] = [];
  admin: User = new User();
  project: Project = new Project();
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
  selectedFile: File | null = null;
  selectedFileName: String | null = null;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense() {
    if (this.expenseId != null)
      Expense.load(this.expenseId).then((response) => {
        if ('expense_info' in response) {
          this.expense = Expense.jsontoObject(response['expense_info']);
          this.loadExpenseProject();
          this.formGroup.controls['concept'].setValue(this.expense.concept);
          this.formGroup.controls['date'].setValue(this.expense.date);
          this.formGroup.controls['amount'].setValue(this.expense.amount);
          this.formGroup.controls['vatpercentage'].setValue(
            this.expense.vatpercentage
          );
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

  loadExpenseProject() {
    Project.load(this.expense.project).then((response) => {
      if ('project_info' in response) {
        this.project = Project.jsontoObject(response['project_info']);
        User.loadUser(this.project.admin).then((response) => {
          if ('user_info' in response)
            this.admin = User.jsontoObject(response['user_info']);
          else if ('message' in response) {
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
        if (this.project.admin == this.localStorageService.get('username'))
          this.isAuthorized = true;
        else
          this.project.imManager().then((response: any) => {
            if ('is_manager' in response)
              this.isAuthorized = response['is_manager'];
            else if ('message' in response) {
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
        this.loadProjectAdmin();
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

  loadProjectAdmin() {
    if (this.project.id != null) {
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
          let auxUser = this.users.find(
            (user) => user.username == this.expense.user
          );
          if (auxUser != undefined) {
            this.expenseUser = auxUser;
            this.expenseUsername = this.expenseUser.username;
            this.formGroup.controls['username'].setValue(this.expenseUsername);
          }
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
  }

  changeView() {
    this.detailsView = !this.detailsView;
  }

  updateExpense() {
    if (this.formGroup.valid) {
      this.expense.user = this.formGroup.controls['username'].value;
      this.expense.date = this.formGroup.controls['date'].value;
      this.expense.concept = this.formGroup.controls['concept'].value;
      this.expense.amount = this.formGroup.controls['amount'].value;
      this.expense.vatpercentage =
        this.formGroup.controls['vatpercentage'].value;
      if (this.selectedFile != null) this.expense.dossier = this.selectedFile;
      this.expense.update().then((response: any) => {
        if ('expense_info' in response) {
          this.expense = Expense.jsontoObject(response['expense_info']);
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
    }
  }

  deleteExpense(expense: Expense) {
    const ref = this.dialog.open(DialogExpenseDeleteComponent, {
      data: {
        expense: expense,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.router.navigate(['/project/' + this.expense.project]);
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
