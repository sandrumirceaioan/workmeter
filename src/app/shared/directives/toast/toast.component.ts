import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('toast loaded');
  }

}
