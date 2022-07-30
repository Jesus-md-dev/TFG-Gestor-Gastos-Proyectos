import { formatDate } from '@angular/common';
import { GlobalComponent } from './global-component';
import { IncomeService } from './income.service';

export class Income {
  [x: string]: any;
  id: number;
  project: number;
  date: Date;
  concept: string;
  amount: number;
  private _dossier: File | null;
  private _dossierUrl: string | null;

  constructor(
    id = 0,
    project = 0,
    dossierUrl = '',
    date = new Date(),
    concept = '',
    amount = 0,
    dossier = null
  ) {
    this.id = id;
    this.project = project;
    this.date = date;
    this.concept = concept;
    this.amount = amount;
    this._dossierUrl =
      dossierUrl != null ? GlobalComponent.apiUrl + dossierUrl : null;
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
      return await IncomeService.update(
        this.id,
        this.project,
        this.dossier,
        this.date,
        this.concept,
        this.amount,
      );
  }

  async delete() {
    if (typeof this.id == 'number') return await IncomeService.delete(this.id);
  }

  static async load(incomeId: number) {
    return IncomeService.loadIncomeData(incomeId);
  }

  static jsontoList(json: any) {
    let incomes: any = [];
    json.forEach((income: any) => {
      incomes.push(this.jsontoObject(income));
    });
    return incomes;
  }

  static jsontoObject(income: any) {
    return new Income(
      income['id'],
      income['project'],
      income['dossier'],
      new Date(income['date']),
      income['concept'],
      income['amount'],
      income['vatpercentage'],
    );
  }
}
