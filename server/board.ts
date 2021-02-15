
export class Board {


  /**
   * 0,0 | 0,1 | 0,2
   * 1,0 | 1,1 | 1,2
   * 2,0 | 2,1 | 2,2
   */
  board = [['', '', ''], ['', '', ''], ['', '', '']];

  constructor() {}

  /** Check if board is done. */
  check(): boolean {
    if (this.board[0][0] !== '') {
      if (this.board[0][0] === this.board[0][1] && this.board[0][0] === this.board[0][2]) {
        return true;
      }
      if (this.board[0][0] === this.board[1][0] && this.board[0][0] === this.board[2][0]) {
        return true;
      }
    }

    if (this.board[1][1] !== '') {
      if (this.board[1][0] === this.board[1][1] && this.board[1][0] === this.board[1][2]) {
        return true;
      }
      if (this.board[0][1] === this.board[1][1] && this.board[0][1] === this.board[2][1]) {
        return true;
      }
      if (this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2]) {
        return true;
      }
      if (this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]) {
        return true;
      }
    }

    if (this.board[2][2] !== '') {
      if (this.board[2][0] === this.board[2][1] && this.board[2][0] === this.board[2][2]) {
        return true;
      }
      if (this.board[0][2] === this.board[1][2] && this.board[0][2] === this.board[2][2]) {
        return true;
      }
    }
    return false;
  }

  /** Update board */
  playPosition(x: number, y: number, player: string): void {
    this.board[x][y] = player;
  }

  freePositions(): { x: number; y: number; }[]  {
    const positions: { x: number; y: number; }[] = [];

    this.board.forEach((line, x) => {
      line.forEach((pos, y) => {
        if (pos === '') {
          positions.push({
            x,
            y
          });
        }
      });
    });

    return positions;
  }

  private randomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  randomPosition(): {x: number, y: number} {
    const freePositions = this.freePositions();

    if (freePositions.length === 0) {
      return {x: -1, y: -1};
    }

    return freePositions[this.randomNumber(freePositions.length)];
  }
}
