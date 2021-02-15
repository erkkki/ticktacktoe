import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../core/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: any;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  play(x: number, y: number): void {
    this.gameService.play(x, y);
  }

}
