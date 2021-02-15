import { v4 as uuid } from 'uuid';

import { Board } from './board';
import { User } from './user';
import {UserInterface} from '../models/user';

export class Game {
  id: string;
  winner: User | undefined;
  board: Board;
  playerOne: UserInterface;
  playerTwo: UserInterface;
  turn: UserInterface;

  constructor(playerOne: UserInterface, playerTwo: UserInterface) {
    this.id = uuid();
    this.board = new Board();
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.turn = playerOne;
  }

  play(user: User, x: number, y: number): void {
    /** If it's users turn */
    if (user.id !== this.turn.id) {
      return;
    }

    if (this.winner){
      return;
    }

    if (this.board.freePositions().length <= 0) {
      const tieUser = new User();
      tieUser.username = 'House wins on tie';
      this.winner = tieUser;
    }

    if (x < 0 || x > 3) {
      return;
    }
    if (y < 0 || y > 3) {
      return;
    }

    /** If postion is playable */
    if (this.board.board[x][y] !== '') {
      return;
    }



    const value = (this.playerOne.id === user.id) ? 'X' : 'O';

    /** Play turn */
    this.board.playPosition(x, y, value);

    /** Check if winning move */
    const winner = this.board.check();

    /** Change whos turn it is */
    if (winner) {
      this.winner = user;
    } else {
      this.turn = (user === this.playerOne) ? this.playerTwo : this.playerOne;
    }
  }
}
