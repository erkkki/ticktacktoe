import { UserInterface } from './user';

export interface GameInterface {
    id: string;
    playerOne: UserInterface;
    playerTwo: UserInterface;
}
