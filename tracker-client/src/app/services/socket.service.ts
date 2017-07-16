import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:4040'; //TODO should be configurable
  private socket;
  private socketObserver: Observer<any>;
  socketObservable$: Observable<any>;

  constructor() {
    this.socketObservable$ = new Observable(observer => this.socketObserver = observer).share();
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
