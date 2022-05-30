import { ExpenseService } from "./expense.service";

export class Expense {
  id: number | null;
  project: number | null;
  user: string;
  dossier: string;
  date: Date;
  concept: string;
  amount: number;
  vatpercentage: number;
  final_amount: number;

  constructor(
    id = null,
    project = null,
    user = '',
    dossier = '',
    date = new Date(),
    concept = '',
    amount = 0,
    vatpercentage = 0,
    final_amount = 0
  ) {
    this.id = id;
    this.project = project;
    this.user = user;
    this.dossier = dossier;
    this.date = date;
    this.concept = concept;
    this.amount = amount;
    this.vatpercentage = vatpercentage;
    this.final_amount = final_amount;
  }

  async delete() {
    if (typeof this.id == 'number') return await ExpenseService.delete(this.id);
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
