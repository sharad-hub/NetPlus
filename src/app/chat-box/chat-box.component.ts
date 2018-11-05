import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  animations: [
    trigger('ToggelChat', [
      state('show', style({
         bottom: 0
      })),
      state('hide', style({
         bottom: '-360px'
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('100ms ease-in')),
    ])
  ]
})
export class ChatBoxComponent implements OnInit {
  show = false;
  constructor() { }

  ngOnInit() {
  }
 get stateName() {
  return this.show ? 'show' : 'hide';
}
toggel() {
  this.show = !this.show;
}
}
