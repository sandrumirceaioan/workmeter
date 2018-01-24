import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {
  resolved;
  menuState:string = 'out';
  
  constructor(private route: ActivatedRoute, private userService: UsersService) {
  }

  ngOnInit() {
    this.resolved = this.route.snapshot.data;
    console.log('logged compopnent: ',this.resolved);

  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log(this.menuState);
  }

  receiveStatus($event) {
    this.menuState = $event;
  }

}
