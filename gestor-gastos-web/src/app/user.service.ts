import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { GlobalComponent } from './global-component';
import { LocalStorageService } from './local-storage.service';
import { Project } from './project';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  static localStorageService: LocalStorageService = new LocalStorageService();

  constructor() {}

  static async loadUser(username: string) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/user/' + username,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return User.jsontoObject(response.data['user_info']);
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
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
      return Project.jsontoList(response.data);
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async getUserProjectsMember(username: string) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/member_projects/' + username,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return Project.jsontoList(response.data);
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async create(
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/register/',
        {
          username,
          password,
          first_name,
          last_name,
          email,
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async update(
    username: string,
    first_name: string,
    last_name: string,
    img: File | null
  ) {
    try {
      const formData = new FormData();
      formData.append('img', img as File);
      formData.append('username', username);
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      const response = await axios.put(
        GlobalComponent.apiUrl + '/api/update_user/',
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

  static async delete(username: string) {
    try {
      const response = await axios.delete(
        GlobalComponent.apiUrl + '/api/delete_user/' + username,
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

  static async userLogin(username: string, password: string) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/login/',
        {
          username,
          password,
        }
      );
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async userExist(username: string) {
    try {
      const response = await axios.get(
        GlobalComponent.apiUrl + '/api/user/' + username,
        {
          headers: {
            Authorization: 'Token ' + this.localStorageService.get('token'),
          },
        }
      );
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }
}
