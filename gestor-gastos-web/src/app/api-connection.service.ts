import { Injectable } from '@angular/core';
import axios from 'axios';
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
      return await axios.get(GlobalComponent.apiUrl + '/api/isalive/');
    } catch (error) {
      return error;
    }
  }

  static async isTokenAvailable() {
    try {
      return await axios.get(GlobalComponent.apiUrl + '/api/tokenavailable/', {
        headers: {
          Authorization: 'Token ' + this.localStorageService.get('token'),
        },
      });
    } catch (error) {
      return error;
    }
  }
}
