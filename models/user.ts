export interface UserInterface {
  socket: any;
  id: string;
  username: string;

  play(game: any): void;
}
