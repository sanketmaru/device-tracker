// auth.service.ts

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class AuthService {

  // expose to component
  signUpNotification$: Observable<any>;
  loginNotification$: Observable<any>;

  private signUpObserver: Observer<any>;
  private loginObserver: Observer<any>;

  constructor(private http: Http) {
    this.signUpNotification$ = new Observable(observer => this.signUpObserver = observer).share();
    this.loginNotification$ = new Observable(observer => this.loginObserver = observer).share();
  }

  login(credentials) {
    this.http.post('http://localhost:4040/api/auth/login', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => {
          localStorage.setItem('token', data.token);
          this.loginObserver.next({
              token : data.token
          });
        },
        error => console.log(error)
      );
  }

  signup(credentials) {
     this.http.post('http://localhost:4040/api/users', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the saved user object
        data => {
          this.signUpObserver.next({
              message : 'Success'
          });
        },
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
