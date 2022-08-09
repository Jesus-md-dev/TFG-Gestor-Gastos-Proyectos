import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiConnectionService } from './api-connection.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  localStorageService = new LocalStorageService();
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin = route.data['requiresLogin'] || false;
    return ApiConnectionService.isTokenAvailable().then((response) => {
      if (response != undefined && 'token_info' in response) return true;
      else {
        this.localStorageService.remove('token');
        this.localStorageService.remove('username');
        if (requiresLogin) return false;
        else return true;
      }
    });
    
  }
}
