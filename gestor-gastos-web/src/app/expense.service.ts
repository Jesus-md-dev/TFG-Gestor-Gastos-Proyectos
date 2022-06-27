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
    dossier: File | null,
    date: Date,
    concept: string,
    amount: number,
    vatpercentage: number
  ) {
    try {
      const formData = new FormData();
      if (dossier != null) formData.append('dossier', dossier as File);
      formData.append('project_id', projectId.toString());
      formData.append('username', username);
      formData.append(
        'date',
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      );
      formData.append('concept', concept);
      formData.append('amount', amount.toString());
      formData.append('vatpercentage', vatpercentage.toString());
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/create_expense/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
    try {
      const response = await axios.delete(
        GlobalComponent.apiUrl + '/api/delete_expense/' + id,
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

  static async loadExpenseData(expenseId: number) {
    try {
      let response = await axios.get(
        GlobalComponent.apiUrl + '/api/expense/' + expenseId,
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

  static async update(
    id: number,
    projectId: number,
    username: string,
    dossier: File | null,
    date: Date,
    concept: string,
    amount: number,
    vatpercentage: number
  ) {
    try {
      const formData = new FormData();
      if (dossier != null) formData.append('dossier', dossier as File);
      formData.append('id', id.toString());
      formData.append('project_id', projectId.toString());
      formData.append('username', username);
      formData.append(
        'date',
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      );
      formData.append('concept', concept);
      formData.append('amount', amount.toString());
      formData.append('vatpercentage', vatpercentage.toString());
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/update_expense/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
