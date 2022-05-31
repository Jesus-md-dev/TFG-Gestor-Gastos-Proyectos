import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  static localStorageService: LocalStorageService = new LocalStorageService();
  constructor() {}

  static async isApiAlive() {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/isalive/'
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async isTokenAvailable() {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/tokenavailable/',
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
