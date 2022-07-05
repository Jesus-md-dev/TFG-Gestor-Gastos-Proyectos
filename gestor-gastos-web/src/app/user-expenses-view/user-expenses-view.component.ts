import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Expense } from '../expense';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';
import { User } from '../user';

interface ProjectExpenses {
  projectName: string,
  expenses: Expense[]
}


@Component({
  selector: 'app-user-expenses-view',
  templateUrl: './user-expenses-view.component.html',
  styleUrls: ['./user-expenses-view.component.css'],
})
export class UserExpensesViewComponent implements OnInit {
  user: User = new User();
  expensesByProject: any = [];
  localStorageService = new LocalStorageService();

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadExpensesByProject().then((response) => {
      this.expensesByProject = response;
      for (const key in this.expensesByProject) {
        Project.load(Number(key)).then((response) => {
          if('project_info' in response) {
            this.expensesByProject[key]['projectName'] = response['project_info'].name
          } else {
            this.snackBar.open('Unable to load project ' + key + ' name', 'Close', {
              duration: 3 * 1000,
            });
          }
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
        expenses[expense.project] = expenses[expense.project] || {projectName: "", expenses: []};
        expenses[expense.project].expenses.push(expense);
        return expenses;
      }, Object.create(null));
    }
    return expenses;
  }

  loadExpensesByProject() {
    return this.user.getExpenses().then((response) => {
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
