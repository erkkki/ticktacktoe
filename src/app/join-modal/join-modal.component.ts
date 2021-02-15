import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss']
})
export class JoinModalComponent implements OnInit {

  username = '';
  show = true;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  save(): void {
    this.userService.updateUsername(this.username);
    this.show = false;
  }

}
