import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket$: WebSocketSubject<any> | undefined;
  messages$: Subject<any>;

  constructor() {
    this.messages$ = new Subject<any>();
    this.connect();
  }


  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket('ws://localhost:8999');
      this.socket$.subscribe(value => {
        console.log(value);
        const message = value;
        this.messages$.next(message);
      });
    }
  }
  sendMessage(msg: any): void {
    console.log(msg);
    this.socket$?.next(msg);
  }
}
