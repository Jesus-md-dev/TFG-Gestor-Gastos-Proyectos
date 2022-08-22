import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Expense } from '../expense';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-user-expenses-view',
  templateUrl: './user-expenses-view.component.html',
  styleUrls: ['./user-expenses-view.component.css'],
})
export class UserExpensesViewComponent implements OnInit {
  user: User = new User();
  expensesByProject: any = {};
  localStorageService = new LocalStorageService();
  firstKey: string = '-1';
  projectId: number | null = null;
  routeSub: Subscription = new Subscription();
  username = this.localStorageService.get('username');
  noExpenses: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: { [x: string]: any }) => {
        this.projectId = params['projectId'];
        this.username = params['username'];
      }
    );
    this.loadExpensesByProject().then((response) => {
      this.expensesByProject = response;
      if (Object.keys(this.expensesByProject).length > 0)
        this.noExpenses = false;
      this.firstKey = Object.keys(response)[0];
      for (const key in this.expensesByProject) {
        Project.load(Number(key)).then((response) => {
          if ('project_info' in response) {
            this.expensesByProject[key]['project_info'] = Project.jsontoObject(
              response['project_info']
            );
          } else
            this.snackBar.open(this.translate.instant('loading error'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
        });
      }
    });
  }

  isDictEmpty(dict: any[]) {
    return Object.keys(this.expensesByProject).length == 0;
  }

  groupExpensesByProject(expenses: Expense[]) {
    if (expenses.length > 0) {
      expenses = expenses.reduce(function (expenses, expense) {
        expenses[expense.project] = expenses[expense.project] || {
          expenses: [],
        };
        expenses[expense.project].expenses.push(expense);
        return expenses;
      }, Object.create(null));
    }
    return expenses;
  }

  loadExpensesByProject() {
    if (this.username != null)
      return User.getUserExpenses(this.username, this.projectId).then(
        (response) => {
          if ('expenses_info' in response) {
            let expenses = Expense.jsontoList(response['expenses_info']);
            return this.groupExpensesByProject(expenses);
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
          return [];
        }
      );
    else
      return this.user.getExpenses(this.projectId).then((response) => {
        if ('expenses_info' in response) {
          let expenses = Expense.jsontoList(response['expenses_info']);
          return this.groupExpensesByProject(expenses);
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          return [];
        } else {
          this.snackBar.open(
            this.translate.instant('system error'),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
          this.router.navigate(['/']);
          return [];
        }
      });
  }
}
