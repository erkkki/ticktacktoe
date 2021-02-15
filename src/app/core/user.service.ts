import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {UserInterface} from '../../../models/user';
import {ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: ReplaySubject<UserInterface> = new ReplaySubject<UserInterface>();
  public userCount: ReplaySubject<number> = new ReplaySubject<number>();
  private tempUser = {id: '', username: ''};

  constructor(
    private socket: SocketService
  ) {
    this.socket.messages$.subscribe(value => {

      if (value?.type === 'USER') {
        this.user.next(value.user);
        this.tempUser = value.user;
      }
      if (value?.type === 'USER_COUNT') {
        this.userCount.next(value.userCount);
      }
    });
  }

  updateUsername(value: string): void {
    this.tempUser.username = value;
    this.socket.sendMessage({
      type: 'USER',
      action: 'USERNAME',
      user: this.tempUser,
    });
  }

  getCount(): void {
    this.socket.sendMessage({
      type: 'USER',
      action: 'USER_COUNT'
    });
  }

}
