import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition, query, stagger } from '@angular/animations';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('0.3s ease-out')),
      transition('out => in', animate('0.3s ease-out'))
    ]),
  ]
})
export class MainComponent implements OnInit {
  menuState:string = 'out';
  
  constructor(private userService: UsersService) {
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log(this.menuState);
  }

  receiveStatus($event) {
    this.menuState = $event;
  }
}
