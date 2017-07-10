// auth.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login(credentials) {
    this.http.post('http://localhost:4040/api/auth/login', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => localStorage.setItem('token', data.token),
        error => console.log(error)
      );
  }

  signup(credentials) {
    this.http.post('http://localhost:4040/api/users', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the saved user object
        data => console.log(data),
        error => console.log(error)
      );
  }

  loggedIn() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}
