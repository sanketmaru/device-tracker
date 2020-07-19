
import {share} from 'rxjs/operators';
import { Subject ,  Observable ,  Observer } from 'rxjs';

import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class SocketService {
  // Our localhost address that we set in our server code
  private url = environment.baseUrl;
  private socket;
  private socketObserver: Observer<any>;
  socketObservable$: Observable<any>;

  constructor() {
    this.socketObservable$ = new Observable(observer => this.socketObserver = observer).pipe(share());
    this.getLocations();
  }

  getLocations() {
    this.socket = io(this.url);
    this.socket.on('location', (data) => {
      console.log("new message client", data);
      this.socketObserver.next(data);
    });
    this.socket.on('location-present', (data) => {
      console.log("Location already present");
    });
    return () => {
      this.socket.disconnect();
    };
  }

  sendMessage(location){
    // Make sure the "add-message" is written here because this is referenced in on() in our server
    this.socket.emit('add-location', location);
  }
}
