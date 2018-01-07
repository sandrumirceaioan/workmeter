import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared/animations/slide-left.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [routerTransition('left')],
  host: {'[@routerTransition]': ''}
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
