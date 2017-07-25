// auth.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  
  constructor(private http: Http) {
  }

  login(credentials) {
    return this.http.post(environment.login, credentials)
      .map(res => res.json());
  }

  loggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : false;
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
  }
}
