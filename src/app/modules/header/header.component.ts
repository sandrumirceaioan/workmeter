import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() toggle = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
  }

  toggleMenu(): void {
    this.toggle.emit('in')
  }

}
