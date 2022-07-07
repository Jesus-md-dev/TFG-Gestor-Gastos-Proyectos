import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() {}

  ngOnInit(): void {}

  onSend() {
    if (this.formGroup.valid) {
      const formData = new FormData();
      console.log(this.formGroup.controls['email'].value);
      console.log(this.formGroup.controls['message'].value);
      formData.append('email', this.formGroup.controls['email'].value);
      formData.append('message', this.formGroup.controls['message'].value);
      axios.post(GlobalComponent.apiUrl + '/api/send_email/', formData);
    }
  }
}
