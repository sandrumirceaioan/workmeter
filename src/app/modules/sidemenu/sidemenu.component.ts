import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'side-menu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  @Output() toggle = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  closeMenu(): void {
    this.toggle.emit('out');
  }

  logout(){
    localStorage.removeItem('wmtoken');
    this.router.navigate(['login']);
  }

}
