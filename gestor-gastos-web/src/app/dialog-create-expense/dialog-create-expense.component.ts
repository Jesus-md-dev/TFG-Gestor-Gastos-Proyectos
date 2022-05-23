import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-dialog-create-expense',
  templateUrl: './dialog-create-expense.component.html',
  styleUrls: ['./dialog-create-expense.component.css'],
})
export class DialogCreateExpenseComponent implements OnInit {
  projectId = 7;
  formGroup: FormGroup = new FormGroup({
    // username: new FormControl('', [Validators.required]),
    // dossier: new FormControl('', [Validators.required]),
    // date: new FormControl('', [Validators.required]),
    // concept: new FormControl('', [Validators.required]),
    // amount: new FormControl('', [Validators.required]),
    // vatpercentage: new FormControl('', [
    //   Validators.required,
    //   Validators.max(100),
    //   Validators.min(0),
    // ]),
    username: new FormControl(''),
    dossier: new FormControl(''),
    date: new FormControl(''),
    concept: new FormControl(''),
    amount: new FormControl(''),
    vatpercentage: new FormControl('', [
      Validators.max(100),
      Validators.min(0),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  createExpense(): void {
    ExpenseService.create(
      7,
      this.formGroup.controls['username'].value,
      this.formGroup.controls['dossier'].value,
      this.formGroup.controls['date'].value,
      this.formGroup.controls['concept'].value,
      this.formGroup.controls['amount'].value,
      this.formGroup.controls['vatpercentage'].value
    ).then((response) => {
      console.log(response);
    });
  }
}
