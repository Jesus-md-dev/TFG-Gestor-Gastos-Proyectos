import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogExpenseDeleteComponent } from '../dialog-expense-delete/dialog-expense-delete.component';
import { DialogIncomeDeleteComponent } from '../dialog-income-delete/dialog-income-delete.component';
import { Expense } from '../expense';
import { Income } from '../income';
import { LocalStorageService } from '../local-storage.service';
import { Project } from '../project';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css'],
})
export class ExpensesTableComponent implements OnChanges {
  @Input() expenses: Expense[] = [];
  @Input() incomes: Expense[] = [];
  @Input() userView: boolean = false;
  @Input() projectId: number | null = null;
  project: any = new Project();
  isAuthorized: boolean = false;
  expensesDataSource = new MatTableDataSource<Expense>();
  localStorageService = new LocalStorageService();
  routeSub: Subscription = new Subscription();
  finalAmount: number = 0;
  finalAmountMoth: number = 0;
  displayedColumns: string[] = [
    'user',
    'dossier',
    'date',
    'amount',
    'vatpercentage',
    'final_amount',
    'showBtn',
    'deleteBtn',
  ];

  @Output('parentUpdateExpenseList')
  parentUpdateExpenseList: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      (params: { [x: string]: any }) => {
        this.projectId = params['projectId'];
      }
    );
    if (this.projectId != null)
      Project.load(this.projectId).then((response) => {
        if ('project_info' in response) {
          this.project = Project.jsontoObject(response['project_info']);
          if (this.project.admin == this.localStorageService.get('username'))
            this.isAuthorized = true;
          else
            this.project.imManager().then((response: any) => {
              if (response.status == 200) this.isAuthorized = true;
              else if ('message' in response) {
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
        } else if ('message' in response) {
          this.snackBar.open(
            this.translate.instant(response['message']),
            this.translate.instant('Close'),
            {
              duration: 3 * 1000,
            }
          );
        } else {
          this.snackBar.open(this.translate.instant('system error'), this.translate.instant('Close'), {
            duration: 3 * 1000,
          });
          this.router.navigate(['/']);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property === 'expenses')
        this.expenses = changes[property].currentValue;
      if (property === 'incomes') this.incomes = changes[property].currentValue;
    }

    this.updateExpenseList();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.expensesDataSource.paginator = this.paginator;
    this.expensesDataSource.paginator._intl.itemsPerPageLabel =
      this.translate.instant('Items per page');
    this.expensesDataSource.paginator._intl.previousPageLabel =
      this.translate.instant('Previous page');
    this.expensesDataSource.paginator._intl.nextPageLabel =
      this.translate.instant('Next page');
    this.expensesDataSource.paginator._intl.firstPageLabel =
      this.translate.instant('First page');
    this.expensesDataSource.paginator._intl.lastPageLabel =
      this.translate.instant('Last page');
  }

  deleteExpense(expense: Expense) {
    const ref = this.dialog.open(DialogExpenseDeleteComponent, {
      data: {
        expense: expense,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.parentUpdateExpenseList.emit();
    });
  }

  deleteIncome(expense: Income) {
    const ref = this.dialog.open(DialogIncomeDeleteComponent, {
      data: {
        income: expense,
      },
    });
    ref.componentInstance.onDeleteEmitter.subscribe((data) => {
      this.parentUpdateExpenseList.emit();
    });
  }

  getPageSizeOptions(): number[] {
    return [5, 10, 15, 20];
  }

  updateExpenseList() {
    this.finalAmount = 0;
    this.finalAmountMoth = 0;
    let currentDate = new Date();
    this.incomes.forEach((income) => {
      this.finalAmount += income.amount;
      if (income.date.getMonth() == currentDate.getMonth()) {
        this.finalAmountMoth += income.amount;
      }
    });

    this.expenses.forEach((expense) => {
      this.finalAmount -= expense.final_amount;
      if (expense.date.getMonth() == currentDate.getMonth()) {
        this.finalAmountMoth -= expense.final_amount;
      }
    });

    this.expensesDataSource.data = this.incomes
      .concat(this.expenses)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    this.expensesDataSource.sort = this.sort;
  }
}
