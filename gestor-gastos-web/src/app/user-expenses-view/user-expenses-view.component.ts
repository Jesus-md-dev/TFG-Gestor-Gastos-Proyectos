import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expense } from '../expense';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';
import { UserService } from '../user.service';

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
  noExpenses: boolean = false;

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params: { [x: string]: any }) => {
        this.projectId = params['projectId'];
        this.username = params['username'];
      }
    );
    this.loadExpensesByProject().then((response) => {
      this.expensesByProject = response;
      this.firstKey = Object.keys(response)[0];
      for (const key in this.expensesByProject) {
        Project.load(Number(key)).then((response) => {
          if ('project_info' in response) {
            this.expensesByProject[key]['project_info'] = Project.jsontoObject(
              response['project_info']
            );
          } else
            this.snackBar.open(
              'Unable to load project ' + key + ' name',
              'Close',
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
      return UserService.getUserExpenses(this.username, this.projectId).then(
        (response) => {
          if ('expenses_info' in response) {
            let expenses = Expense.jsontoList(response['expenses_info']);
            if (expenses.length === 0) this.noExpenses = true;
            return this.groupExpensesByProject(expenses);
          } else {
            this.snackBar.open('Error loading user expenses', 'Close', {
              duration: 3 * 1000,
            });
            return [];
          }
        }
      );
    else
      return this.user.getExpenses(this.projectId).then((response) => {
        if ('expenses_info' in response) {
          let expenses = Expense.jsontoList(response['expenses_info']);
          return this.groupExpensesByProject(expenses);
        } else {
          this.snackBar.open('Error loading user expenses', 'Close', {
            duration: 3 * 1000,
          });
          return [];
        }
      });
  }
}
