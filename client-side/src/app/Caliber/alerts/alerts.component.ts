import { Component, OnInit } from '@angular/core';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0 }))
      ]),
      transition('enter => leave', animate('600ms ease-out')),
      transition('leave => enter', animate('1000ms ease-in'))
    ])
  ]
})
export class AlertsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
