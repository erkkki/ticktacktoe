import { Injectable } from '@angular/core';
import {SocketService} from './socket.service';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Subject<any>;
  gameLastValue: any;

  constructor(
    private socket: SocketService
  ) {
    this.game = new Subject<any>();
    this.socket.messages$.subscribe(value => {
      if (value?.type === 'GAME') {
        if (value?.action === 'NEW') {
          this.game.next(value.game);
          this.gameLastValue = value.game;
        }
        if (value?.action === 'UPDATE') {
          this.game.next(value.game);
          this.gameLastValue = value.game;
        }
      }
    });
  }

  newGame(): void {
    this.socket.sendMessage({
      type: 'GAME',
      action: 'NEW'
    });
  }

  play(x: number, y: number): void {
    this.socket.sendMessage({
      type: 'GAME',
      action: 'MOVE',
      game: this.gameLastValue,
      x,
      y,
    });
  }
}
