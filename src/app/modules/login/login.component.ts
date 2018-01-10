import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toast: ToastService) { }

  ngOnInit() {
  }

  successMessage(){
    this.toast.toastTrigger({
      message: 'Success message!',
      options: {type: 'success'}
    });
  }

  successMessageTwo(){
    this.toast.toastTrigger({
      message: 'Error message!',
      options: {type: 'error',}
    });
  }

}
