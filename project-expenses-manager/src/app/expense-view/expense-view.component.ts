import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css'],
})
export class ExpenseViewComponent implements OnInit {
  expenseId: number | null = null;
  routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      (params: { [x: string]: any }) => {
        this.expenseId = params['expenseId'];
      }
    );
  }
}
