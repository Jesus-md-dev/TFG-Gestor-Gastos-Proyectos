import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-view',
  templateUrl: './income-view.component.html',
  styleUrls: ['./income-view.component.css'],
})
export class IncomeViewComponent implements OnInit {
  incomeId: number | null = null;
  routeSub: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(
      (params: { [x: string]: any }) => {
        this.incomeId = params['incomeId'];
      }
    );
  }
}
