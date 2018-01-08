import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { ToastService, ToastMessage } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs/Subscription';
import { setTimeout } from 'timers';

enum ToastState {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE'
}

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('fadeToast',[
      state(ToastState.HIDDEN, style({opacity:0, offset: 0})),
      state(ToastState.VISIBLE, style({opacity:1, offset: 1})),
      transition(`${ToastState.HIDDEN} <=> ${ToastState.VISIBLE}`, animate('0.5s ease-in-out'))
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  toast: ToastMessage;
  subscription: Subscription;
  state: ToastState = ToastState.HIDDEN;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.currentToast$.subscribe(data => {
      this.toast = data;
      this.state = ToastState.VISIBLE;
      var timeoutHandle = setTimeout(()=>{
        this.state = ToastState.HIDDEN;
      },this.toast.timeout);
    });
  }

  ngOnDestroy() {
    console.log('destroy toast');
    this.subscription.unsubscribe();
  }
}
