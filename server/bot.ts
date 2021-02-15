import {UserInterface} from '../models/user';
import {v4 as uuid} from 'uuid';

export class Bot implements UserInterface{

  socket: any;
  id: string;
  username: string;

  constructor() {
    this.id = 'bot';
    this.username = 'Awesome Bot';
  }

  toJSON(): any {
    return {
      id: this.id,
      username: this.username,
    };
  }

  play(game: any, x?: number, y?: number): void {
    if (game.winner) {
      return;
    }
    const move = game.board.randomPosition();
    game.play(this, move.x, move.y);
  }
}
