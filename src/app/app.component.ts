import { Component } from '@angular/core';
import {SocketService} from './core/socket.service';
import {UserService} from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticktacktoe';

  constructor(
    public socket: SocketService,
    public userService: UserService
  ) {}
}
