import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { maxDateValidator } from 'custom-validators.directive';
import { Expense } from '../expense';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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
  expense: Expense = new Expense();
  detailsView: boolean = true;
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

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense() {
    if (this.expenseId != null)
      Expense.load(this.expenseId).then((response) => {
        if (response.hasOwnProperty('expense_info')) {
          this.expense = Expense.jsontoObject(response['expense_info']);
          this.loadExpenseProject();
          this.formGroup.controls['concept'].setValue(this.expense.concept);
          this.formGroup.controls['date'].setValue(this.expense.date);
          this.formGroup.controls['amount'].setValue(this.expense.amount);
          this.formGroup.controls['vatpercentage'].setValue(
            this.expense.vatpercentage
          );
        } else if (response.hasOwnProperty('message')) {
          this.snackBar.open('Can not load expense data', 'Close', {
            duration: 3 * 1000,
          });
        } else {
          this.snackBar.open('Error', 'Close', {
            duration: 3 * 1000,
          });
        }
      });
  }

  loadExpenseProject() {
    ProjectService.loadProjectData(this.expense.project).then((response) => {
      this.project = Project.jsontoObject(response);
      User.loadUser(this.project.admin).then((response) => {
        this.admin = User.jsontoObject(response);
      });
      this.loadProjectAdmin();
    });
  }

  loadProjectAdmin() {
    if (this.project.id != null) {
      ProjectService.getProjectMembers(this.project.id).then((response) => {
        this.users = User.jsontoList(response);
        this.users.push(this.admin);
        this.users.sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase()
            ? 1
            : b.username.toLowerCase() > a.username.toLowerCase()
            ? -1
            : 0
        );
        let expenseUser = this.users.find(
          (user) => user.username == this.expense.user
        );
        if (expenseUser != undefined) {
          this.expenseUsername = expenseUser.username;
          this.formGroup.controls['username'].setValue(this.expenseUsername);
        }
      });
    }
  }

  changeView() {
    this.detailsView = !this.detailsView;
    this.loadExpense();
  }

  updateExpense() {
    if (this.formGroup.valid) {
      this.expense.user = this.formGroup.controls['username'].value;
      this.expense.date = this.formGroup.controls['date'].value;
      this.expense.concept = this.formGroup.controls['concept'].value;
      this.expense.amount = this.formGroup.controls['amount'].value;
      this.expense.vatpercentage =
        this.formGroup.controls['vatpercentage'].value;
      this.expense.update().then((response: any) => {
        if (response.hasOwnProperty('expense_info')) {
          this.expense = Expense.jsontoObject(response['expense_info']);
          this.snackBar.open('Edit success', 'Close', {
            duration: 3 * 1000,
          });
          this.changeView();
        } else {
          this.snackBar.open('Error', 'Close', { duration: 3 * 1000 });
        }
      });
    } else {
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
}
