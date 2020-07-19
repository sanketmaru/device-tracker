// auth.service.ts


import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(environment.login, credentials).pipe(
      map(res => res));
  }

  loggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : false;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
  }
}
