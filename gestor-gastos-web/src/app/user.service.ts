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
      return User.jsontoObject(response['data']['user_info']);
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
      console.log(response['data']);
      return Project.jsontoList(response['data']);
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }

  static async save(username: string, first_name: string, last_name: string, email: string,
    password: string, id: number | null) {
      try {
        const response = await axios.post(
          GlobalComponent.apiUrl + '/api/register/',
          {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email,
          },
        );
        return response.data;
      } catch (error) {
        const e = error as AxiosError
        return e.response?.data;
      }
  }

  static async userLogin(username: string, password:string) {
    try {
      const response = await axios.post(
        GlobalComponent.apiUrl + '/api/login/', {
          username: username,
          password: password,
        }
      );
      console.log("response");
      return response.data;
    } catch (error) {
      const e = error as AxiosError;
      return e.response?.data;
    }
  }
}
