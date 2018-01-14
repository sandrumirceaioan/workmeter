import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../shared/services/toast/toast.service';
import { trigger, state, animate, style, transition, keyframes, query, stagger, group } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
          animate('800ms 600ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
        ]))
      ])
    ]),
  ]
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
