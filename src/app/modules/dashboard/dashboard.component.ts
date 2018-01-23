import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

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
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  logged;
  menuState:string = 'out';
  
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.logged = this.route.snapshot.data;
    console.log('logged compopnent: ',this.logged);
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log(this.menuState);
  }

  receiveStatus($event) {
    this.menuState = $event;
  }

}
