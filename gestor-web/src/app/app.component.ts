import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'gestor-web';
  langs: String[] = ["es", "en"];

  constructor(public translate: TranslateService) {
    {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('en');
    }
  }

  myFunc(){
    console.log("function called");
  }

  public test() {
    console.log(this.translate.langs)
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }


}
