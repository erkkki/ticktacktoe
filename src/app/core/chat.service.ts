import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';

import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../../../server/user';
import {MessageInterface} from '../../../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages$: Subject<any>;
  user = {id: '', username: '', socket: ''};

  constructor(
    private socket: SocketService,
    private userService: UserService
  ) {
    this.messages$ = new Subject<any>();
    this.socket.messages$.subscribe(value => {
      if (value?.type === 'CHAT') {
        this.messages$.next(value.message);
      }
    });
    this.userService.user.subscribe(value => {
      this.user = value;
    });
  }

  sendMessage(message: any): void {
    this.socket.sendMessage({
      type: 'CHAT',
      action: 'NEW_MESSAGE',
      message: {
        id: '',
        time: Date.now(),
        msg: message,
        username: this.user.username,
      }
    });
  }

}
