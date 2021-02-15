import { Component, OnInit } from '@angular/core';
import {GameService} from '../core/game.service';
import {Observable} from 'rxjs';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game$: Observable<any> = new Observable<any>();
  user$: Observable<any> = new Observable<any>();

  constructor(
    private gameService: GameService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.game;
    this.user$ = this.userService.user;
  }

  create(): void {
    this.gameService.newGame();
  }

}
