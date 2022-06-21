import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  fixFileName(name: string): string {
    let max = 30;
    if (name.length < max) return name;
    else {
      let parts: string[] = name.split('.');
      return parts[0].substring(0, max) + '... .' + parts[1];
    }
  }
}
