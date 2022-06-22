import { GlobalComponent } from './global-component';
import { ExpenseService } from './expense.service';
import { formatDate } from '@angular/common';

export class Expense {
  id: number | null;
  project: number | null;
  user: string;
  date: Date;
  concept: string;
  amount: number;
  vatpercentage: number;
  final_amount: number;
  private _dossier: File | null;
  private _dossierUrl: string;

  constructor(
    id = null,
    project = null,
    user = '',
    dossierUrl = '',
    date = new Date(),
    concept = '',
    amount = 0,
    vatpercentage = 0,
    final_amount = 0,
    dossier = null
  ) {
    this.id = id;
    this.project = project;
    this.user = user;
    this.date = date;
    this.concept = concept;
    this.amount = amount;
    this.vatpercentage = vatpercentage;
    this.final_amount = final_amount;
    this._dossierUrl = GlobalComponent.apiUrl + dossierUrl;
    this._dossier = dossier;
  }

  public get dossier(): any {
    return this._dossierUrl;
  }

  public get formmatedDate(): string {
    return formatDate(this.date, 'shortDate', 'es');
  }

  public set dossier(value: File) {
    this._dossier = value;
    var reader = new FileReader();
    reader.readAsDataURL(this._dossier);
    reader.onload = (event: any) => {
      this._dossier = event.target.result;
    };
  }

  async delete() {
    if (typeof this.id == 'number') return await ExpenseService.delete(this.id);
  }

  static async load(expenseId: number) {
    return ExpenseService.loadExpenseData(expenseId);
  }

  static jsontoList(json: any) {
    let expenses: any = [];
    json.forEach((expense: any) => {
      expenses.push(
        new Expense(
          expense['id'],
          expense['project'],
          expense['user'],
          expense['dossier'],
          new Date(expense['date']),
          expense['concept'],
          expense['amount'],
          expense['vatpercentage'],
          expense['final_amount']
        )
      );
    });
    return expenses;
  }

  static jsontoObject(expense: any) {
    return new Expense(
      expense['id'],
      expense['project'],
      expense['user'],
      expense['dossier'],
      new Date(expense['date']),
      expense['concept'],
      expense['amount'],
      expense['vatpercentage'],
      expense['final_amount']
    );
  }
}
