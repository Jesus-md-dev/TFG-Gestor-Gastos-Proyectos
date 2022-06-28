import { formatDate } from '@angular/common';
import { ExpenseService } from './expense.service';
import { GlobalComponent } from './global-component';

export class Expense {
  id: number;
  project: number;
  user: string;
  date: Date;
  concept: string;
  amount: number;
  vatpercentage: number;
  final_amount: number;
  private _dossier: File | null;
  private _dossierUrl: string | null;

  constructor(
    id = 0,
    project = 0,
    user = '',
    dossierUrl = '',
    date = new Date(),
    concept = '',
    amount = 0,
    vatpercentage = 0,
    final_amount = null,
    dossier = null
  ) {    
    this.id = id;
    this.project = project;
    this.user = user;
    this.date = date;
    this.concept = concept;
    this.amount = amount;
    this.vatpercentage = vatpercentage;
    this.final_amount =
      final_amount != null
        ? final_amount
        : Math.round(
            ((amount * (100 + vatpercentage)) / 100 + Number.EPSILON) * 100
          ) / 100;
    this._dossierUrl = dossierUrl != null ? GlobalComponent.apiUrl + dossierUrl : null;
    this._dossier = dossier;
  }

  public get dossier(): any {
    return this._dossierUrl;
  }

  public get formmatedDate(): string {
    return formatDate(this.date, 'shortDate', navigator.language);
  }

  public set dossier(value: File) {
    this._dossier = value;
    var reader = new FileReader();
    reader.readAsDataURL(this._dossier);
    reader.onload = (event: any) => {
      this._dossier = event.target.result;
    };
  }

  async update() {
    if (typeof this.id == 'number')
      return await ExpenseService.update(
        this.id,
        this.project,
        this.user,
        this.dossier,
        this.date,
        this.concept,
        this.amount,
        this.vatpercentage
      );
  }

  async delete() {
    if (typeof this.id == 'number') return await ExpenseService.delete(this.id);
  }

  static async load(expenseId: number) {
    return ExpenseService.loadExpenseData(expenseId);
  }

  static jsontoList(json: any) {
    let expenses: any = [];
    json.forEach((expense: any) => { expenses.push(this.jsontoObject(expense)); });
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
