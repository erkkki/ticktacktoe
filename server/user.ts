import { v4 as uuid } from 'uuid';

import {UserInterface} from '../models/user';


export class User implements UserInterface {
  id;
  username;
  socket: any;
  heartBeat = true;

  constructor() {
    this.id = uuid();
    this.username = uuid();
  }

  play(game: any, x?: number, y?: number): void {
    game.play(this, x, y);
  }

  toJSON(): any {
    return {
      id: this.id,
      username: this.username,
    };
  }
}
