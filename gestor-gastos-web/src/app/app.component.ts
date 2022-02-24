import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'gestor-web';
  cur_lang: string;

  constructor(public translate: TranslateService) {
    {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
      this.cur_lang = 'en'
    }
  }

  switchLang() {
    if(this.cur_lang === 'es')
      this.cur_lang = 'en'
    else
      this.cur_lang = 'es'
    this.translate.use(this.cur_lang);
  }
}
