import { Component, OnInit, Output } from '@angular/core';
import { UsersService } from '../../shared/services/users/users.service';
import { Router } from '@angular/router';
import { WorkmeterService } from '../../shared/services/workmeter/workmeter.service';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hours: any;
  constructor(
    private usersService: UsersService, 
    private router: Router,
    private workmeterService: WorkmeterService,
    private toastService: ToastService

  ) { }

  ngOnInit() {
    this.workmeterService.totalTime({userId: this.usersService.logged._id}).subscribe(
      (result) => {
        this.hours = result;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

  logout(){
    localStorage.removeItem('wmtoken');
    this.usersService.logged = null;
    this.router.navigate(['login']);
  }

}
