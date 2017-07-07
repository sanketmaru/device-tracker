import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

export class ChatService {
  // Our localhost address that we set in our server code
  private url = 'http://localhost:3000'; 
  private socket;
  
  sendMessage(message){
    // Make sure the "add-message" is written here because this is referenced in on() in our server
    this.socket.emit('add-message', message);   
  }

   getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        console.log("new message client", data);
        observer.next(data);   
      });
      return () => {
        this.socket.disconnect();
      }; 
    })    
    return observable;
  } 
}