import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async create(
    projectId: number,
    dossier: File | null,
    date: Date,
    concept: string,
    amount: number,
  ) {
    try {
      const formData = new FormData();
      if (dossier != null) formData.append('dossier', dossier as File);
      formData.append('project_id', projectId.toString());
      formData.append(
        'date',
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      );
      formData.append('concept', concept);
      formData.append('amount', amount.toString());
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/create_income/',
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
        GlobalComponent.apiUrl + '/api/delete_income/' + id,
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

  static async loadIncomeData(incomeId: number) {
    try {
      let response = await axios.get(
        GlobalComponent.apiUrl + '/api/income/' + incomeId,
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
    dossier: File | null,
    date: Date,
    concept: string,
    amount: number,
  ) {
    try {
      const formData = new FormData();
      if (dossier != null) formData.append('dossier', dossier as File);
      formData.append('id', id.toString());
      formData.append('project_id', projectId.toString());
      formData.append(
        'date',
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      );
      formData.append('concept', concept);
      formData.append('amount', amount.toString());
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/update_income/',
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
