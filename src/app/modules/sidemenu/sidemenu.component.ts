import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/services/users/users.service';


@Component({
  selector: 'side-menu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  @Output() toggle = new EventEmitter<string>();
  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit() {
  }

  closeMenu(): void {
    this.toggle.emit('out');
  }

  logout(){
    localStorage.removeItem('wmtoken');
    this.usersService.logged = null;
    this.router.navigate(['login']);
  }

}
