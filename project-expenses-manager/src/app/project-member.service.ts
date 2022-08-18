import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectMemberService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async promoteProjectMembers(projectId: number, username: string) {
    try {
      const formData = new FormData();
      formData.append('project_id', projectId.toString());
      formData.append('username', username);
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/promote_project_member/',
        formData,
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

  static async demoteProjectMembers(projectId: number, username: string) {
    try {
      const formData = new FormData();
      formData.append('project_id', projectId.toString());
      formData.append('username', username);
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/demote_project_member/',
        formData,
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
