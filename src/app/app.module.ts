import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketService } from './core/socket.service';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './board/board.component';
import { JoinModalComponent } from './join-modal/join-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    UserComponent,
    GameComponent,
    BoardComponent,
    JoinModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
