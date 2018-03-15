import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../shared/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('wmtoken');
    this.usersService.logged = null;
    this.router.navigate(['login']);
  }

}
