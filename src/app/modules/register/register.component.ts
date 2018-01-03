import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    invitation: '',
    password: ''
  };
  constructor() { }

  registerUser({valid,value}:{ value: User, valid: boolean }): void{
    console.log(value);
  }

  ngOnInit() {
  }

}
