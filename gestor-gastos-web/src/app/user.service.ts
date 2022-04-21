import { Injectable } from '@angular/core';
import axios from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async getUserData(username: string) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/user/' + username,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return response['data']['user_info'];
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  static async getUserProjects(username: string) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/projects/' + username,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return Project.jsontoList(response['data']);
    } catch (error) {
      console.log(error);
    }
    return [];
  }
}
