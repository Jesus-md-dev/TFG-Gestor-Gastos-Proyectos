import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../project';
import { Expense } from '../expense';

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.css']
})
export class ProjectExpensesComponent implements OnInit {
  expenses: any = []

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    const projectId = Number(routeParams.get('projectId'));
    this.http.get('http://127.0.0.1:8000/get_project_expenses/' + projectId)
      .subscribe((res) => {
      this.expenses = Expense.jsontoList(res);
      console.log(res)
    })
  }

  ngOnInit(): void {
  }

}
