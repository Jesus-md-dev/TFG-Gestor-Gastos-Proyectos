import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
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
        GlobalComponent.apiUrl + '/api/project_members/' + projectId,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return User.jsontoList(response['data']);
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
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
        response.data['project_info']['id'],
        response.data['project_info']['name'],
        response.data['project_info']['category'],
        response.data['project_info']['admin'],
        response.data['project_info']['img']
      );
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async create(name: string, category: string, img: string | null) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/create_project/',
        {
          name: name,
          category: category,
          img: img,
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
    try {
      const response = await axios.delete(
        GlobalComponent.apiUrl + '/api/delete_project/' + id,
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

  static async addMember(username: string, projectId: number) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/add_member_project/',
        {
          project_id: projectId,
          username: username,
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

  static async expellMember(username: string, projectId: number) {

  }
}
