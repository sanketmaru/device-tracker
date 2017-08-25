import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

    constructor() {
    }

    private userLoginMessage = new Subject<string>();
    public messageBroadcaster = this.userLoginMessage.asObservable();

    sendMessage(message: string) {
        this.userLoginMessage.next(message);
    }
}