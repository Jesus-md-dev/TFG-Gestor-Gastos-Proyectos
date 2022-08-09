import { Component, OnInit } from '@angular/core';
import { GlobalComponent } from '../global-component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  url: string = ""
  
  constructor() {}

  ngOnInit(): void {
    this.url = GlobalComponent.apiUrl;
  }
}
