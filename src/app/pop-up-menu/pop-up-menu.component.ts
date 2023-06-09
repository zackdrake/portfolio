import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-pop-up-menu',
  templateUrl: './pop-up-menu.component.html',
  styleUrls: ['./pop-up-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate(300),
      ]),
      transition(':leave', [
        animate(300, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class PopUpMenuComponent implements OnInit {
  isVisible = false;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
    }, 3000);
  }
}
