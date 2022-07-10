import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
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
    if (requiresLogin) {
      return ApiConnectionService.isApiAlive().then((response) => {
        if (response != undefined) {
          this.localStorageService.set('apiAlive', true);
          return ApiConnectionService.isTokenAvailable().then((response) => {
            if ('token_info' in response) return true;
            else {
              this.localStorageService.remove('token');
              this.localStorageService.remove('username');
              return false;
            }
          });
        }
        else {
          this.localStorageService.set('apiAlive', false);
          return false;
        }
      });
    } else return true;
  }
}
