import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rf: FormGroup;
  user: User = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    invitation: '77777',
    password: ''
  };

  constructor(private validationService: ValidationService, private router: Router) { }

  ngOnInit() {
    this.rf = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName,Validators.required),
      userName: new FormControl(this.user.userName,Validators.required),
      email: new FormControl(this.user.email,[
        Validators.required,
        Validators.email
      ]),
      invitation: new FormControl(this.user.invitation,Validators.required),
      password: new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(8),
        this.validationService.passwordValidator
      ])
    });
  }

  onSubmit(){
    console.log(this.rf.value);
    this.rf.reset();
    this.router.navigate(['login']);
  }

}
