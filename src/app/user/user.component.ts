import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {UserInterface} from '../../../models/user';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<any> = new Observable<any>();
  userCount$: Observable<any> = new Observable<any>();
  editUsername = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.userService.user;
    this.userCount$ = this.userService.userCount;

    this.userService.getCount();
  }

  save(username: string): void {
    this.userService.updateUsername(username);
  }

  getUserCount(): void {
    this.userService.getCount();
  }

}
