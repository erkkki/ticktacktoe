import { Component, OnInit } from '@angular/core';
import {ChatService} from '../core/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: any[] = [];
  message = '';

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe(value => {
      console.log('value');
      return this.messages.push(value);
    });
  }

  send(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
