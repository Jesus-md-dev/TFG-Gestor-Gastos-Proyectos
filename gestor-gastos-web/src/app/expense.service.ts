import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async create(
    projectId: number,
    username: string,
    dossier: string,
    date: Date,
    concept: string,
    amount: number,
    vatpercentage: number
  ) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/create_expense/',
        {
          project_id: projectId,
          username,
          dossier,
          date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
          concept,
          amount,
          vatpercentage,
          finalAmount: (amount * vatpercentage) / 100,
        },
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async delete(id: number) {
    console.log("AAAAAAA");

    try {
      const response = await axios.delete(
        GlobalComponent.apiUrl + '/api/delete_expense/' + id,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      console.log(response);

      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async getProjectExpenses(projectId: number) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/expenses/' + projectId,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }
}
