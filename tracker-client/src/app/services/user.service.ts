
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  selectedUser : any;

  constructor(private http: HttpClient) { }

  save(credentials) {
     return this.http.post(environment.users, credentials).pipe(
      map(res => res))
  }

  get(): Observable<any> {
    return this.http.get(environment.users).pipe(
      map(res => res));
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
