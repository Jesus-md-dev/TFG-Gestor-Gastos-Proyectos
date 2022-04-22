import { Injectable } from '@angular/core';
import axios from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { Project } from './project';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async getProjectMembers(projectId: number) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/users', {
        headers: {
          Authorization: 'Token ' + this.localStorageService.get('token'),
        },
      });
      return User.jsontoList(response['data']);
    } catch (error) {
      console.log(error);
    }
    return [];
  }

  static async loadProjectData(projectId: number) {
    try {
      let response = await axios.get(
        GlobalComponent.apiUrl + '/api/project/' + projectId,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return new Project(
        response['data']['id'],
        response['data']['name'],
        response['data']['category'],
        response['data']['admin'],
        response['data']['img']
      );
    } catch (error) {
      console.log(error)
    }
    return []
  }
}
