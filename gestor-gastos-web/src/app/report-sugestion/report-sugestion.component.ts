import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import axios from 'axios';
import { GlobalComponent } from '../global-component';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-report-sugestion',
  templateUrl: './report-sugestion.component.html',
  styleUrls: ['./report-sugestion.component.css'],
})
export class ReportSugestionComponent implements OnInit {
  static localStorageService: LocalStorageService = new LocalStorageService();
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  constructor(
    private snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSend() {
    if (this.formGroup.valid) {
      const formData = new FormData();
      formData.append('email', this.formGroup.controls['email'].value);
      formData.append('toemail', 'jesusmarquezdelgado@gmail.com');
      formData.append('message', this.formGroup.controls['message'].value);
      axios
        .post(GlobalComponent.apiUrl + '/api/send_email/', formData)
        .then((response) => {
          if ('succed' in response.data) {
            this.snackBar.open(
              this.translate.instant('Report sended'),
              this.translate.instant('Close'),
              {
                duration: 3 * 1000,
              }
            );
            this.formGroup.reset();
          } else if ('message' in response.data) {
            this.snackBar.open(
              this.translate.instant(response.data['message']),
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
    }
  }
}
