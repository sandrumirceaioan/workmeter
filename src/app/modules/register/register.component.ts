import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { User } from '../../models/user.model';
import { trigger, state, animate, style, transition, keyframes, query, stagger, group } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('explainerAnim', [
      transition('* => *',[
          query('.explanation', style({opacity: 0, transform: 'translateX(-40px)'})),
          query('.explanation', stagger('300ms',[
            animate('800ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
          ]))
      ])
    ]),
    trigger('explainerAnim2', [
      transition('* => *',[
        query('.explanation2', style({opacity: 0, transform: 'translateX(-40px)'})),
        query('.explanation2', stagger('300ms',[
          animate('800ms 1.5s ease-out', style({opacity: 1, transform: 'translateX(0)'}))
        ]))
      ])
    ])
    // trigger('fadeIn', [
    //   state('void', style({opacity: '0'})),
    //   transition(':enter',
    //     animate('0.5s 300ms ease-out', keyframes([
    //       style({ opacity: '0', transform: 'translateX(-100px)', offset:0 }),
    //       style({ opacity: '0.8', transform: 'translateX(30px)', offset:0.5 }),
    //       style({ opacity: '1', transform: 'translateX(0)', offset:1 })
    //     ])),
    //   )
    // ])
  ]
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
