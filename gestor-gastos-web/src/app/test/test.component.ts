import {Component, OnInit, ViewChild} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})

export class TestComponent implements OnInit {

  displayedColumns: string[] = ['risk_plan', 'questionnairre', 'modified', 'star'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


export interface PeriodicElement {
  risk_plan: string;
  questionnairre: string;
  modified: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {risk_plan: 'Pellentesque habitant',          questionnairre: 'Hydrogen', modified: '10 jan 2019'},
  {risk_plan: 'Morbi tristique senectus',       questionnairre: 'Helium',   modified: '9 jan 2019'},
  {risk_plan: 'Et netus et malesuada',          questionnairre: 'Hydrogen', modified: '8 jan 2019'},
  {risk_plan: 'Fames ac turpis egestas',        questionnairre: 'Hydrogen', modified: '7 jan 2019'},
  {risk_plan: 'Vestibulum tortor quam',         questionnairre: 'Carbon',   modified: '6 jan 2019'},
  {risk_plan: 'Feugiat vitae',                  questionnairre: 'Carbon',   modified: '5 jan 2019'},
  {risk_plan: 'Ultricies eget',                 questionnairre: 'Carbon',   modified: '4 jan 2019'},
  {risk_plan: 'Tempor sit',                     questionnairre: 'Helium',   modified: '3 jan 2019'},
  {risk_plan: 'Amet ante',                      questionnairre: 'Carbon',   modified: '2 jan 2019'},
  {risk_plan: 'Donec eu libero sit amet quam',  questionnairre: 'Carbon',   modified: '1 jan 2019'},
  {risk_plan: 'Egestas semper',                 questionnairre: 'Hydrogen', modified: '31 dec 2018'},
  {risk_plan: 'Aenean ultricies mi vitae est',  questionnairre: 'Helium',   modified: '30 dec 2018'},
  {risk_plan: 'Mauris placerat',                questionnairre: 'Hydrogen', modified: '29 dec 2018'},
  {risk_plan: 'Eleifend leo',                   questionnairre: 'Helium',   modified: '28 dec 2018'},
  {risk_plan: 'Quisque sit amet',               questionnairre: 'Helium',   modified: '27 dec 2018'},
  {risk_plan: 'Est et sapien',                  questionnairre: 'Carbon',   modified: '26 dec 2018'},
  {risk_plan: 'Ullamcorper pharetra',           questionnairre: 'Hydrogen', modified: '25 dec 2018'},
  {risk_plan: 'Vestibulum erat wisi',           questionnairre: 'Helium',   modified: '24 dec 2018'},
  {risk_plan: 'Condimentum sed',                questionnairre: 'Carbon',   modified: '23 dec 2018'},
  {risk_plan: 'Commodo vitae',                  questionnairre: 'Hydrogen', modified: '22 dec 2018'},
];
