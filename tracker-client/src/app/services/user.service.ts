
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  selectedUser : any;

  constructor(private http: Http) { }

  save(credentials) {
     return this.http.post(environment.users, credentials).pipe(
      map(res => res.json()))
  }

  get() {
    return this.http.get(environment.users).pipe(
      map(res => res.json()));
  }

  setSelectedUser(user) {
    this.selectedUser = user;
  }

  getSelectedUser() {
    return this.selectedUser;
  }

  removeSelectedUser() {
    this.selectedUser = {};
  }

}
