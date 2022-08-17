import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async getProjectMembers(project: Project) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/project_members/' + project.id,
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

  static async load(projectId: number) {
    try {
      let response = await axios.get(
        GlobalComponent.apiUrl + '/api/project/' + projectId,
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

  static async create(name: string, category: string, img: File | null) {
    try {
      const formData = new FormData();
      if (img != null) formData.append('img', img as File);
      formData.append('name', name);
      formData.append('category', category);
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/create_project/',
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

  static async update(
    id: any,
    name: string,
    category: string,
    img: File | null
  ) {
    try {
      const formData = new FormData();
      if (img != null) formData.append('img', img as File);
      formData.append('id', id);
      formData.append('name', name);
      formData.append('category', category);
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/update_project/',
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

  static async addMembers(usernames: string[], project: Project) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/add_member_project/',
        {
          project_id: project.id,
          usernames: { usernames },
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

  static async expellMember(project: Project, member_id: number) {
    try {
      const response = await axios.delete(
        GlobalComponent.apiUrl + '/api/delete_project_member/',
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
          data: {
            project_id: project.id,
            member_id,
          },
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async getProjectIncomes(project: Project) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/incomes/' + project.id,
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

  static async imManager(project: Project) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/is_manager/' + project.id,
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

  static async getProjectExpenses(project: Project) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/expenses/' + project.id,
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
