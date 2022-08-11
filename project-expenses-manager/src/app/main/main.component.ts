import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalComponent } from '../global-component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  url: string = '';
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  imageTexts = [
    {
      title: 'Language',
      imageSrc: 'language.jpg',
      text: 'language text',
    },
    {
      title: 'Login & Register',
      imageSrc: 'loginregister.jpg',
      text: 'loginregister text'
    },
    {
      title: 'Profile',
      imageSrc: 'profile.jpg',
      text: 'profile text'
    },
    {
      title: 'Projects',
      imageSrc: 'createproject.jpg',
      text: 'createproject text'
    },
    {
      title: 'Project created',
      imageSrc: 'projectcreated.jpg',
      text: 'projectcreated text'
    },
    {
      title: 'Expenses & Income 1',
      imageSrc: 'incomeexpenses1.jpg',
      text: 'incomeexpenses1 text'
    },
    {
      title: 'Expenses & Income 2',
      imageSrc: 'incomeexpenses2.jpg',
      text: 'incomeexpenses2 text'
    },
    {
      title: 'Members',
      imageSrc: 'members.jpg',
      text: 'members text'
    },
    {
      title: 'Project Configuration',
      imageSrc: 'projectconfig.jpg',
      text: 'projectconfig text'
    },
    {
      title: 'My Expenses',
      imageSrc: 'myexpenses.jpg',
      text: 'myexpenses text'
    },
  ];

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.url = GlobalComponent.apiUrl;
  }
}
