import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ErrorAlertComponent } from '../gambit-client/ui/error-alert/error-alert.component';
import { GambitInterceptor } from '../gambit-client/interceptors/gambit.interceptor';

@Component({
  selector: 'app-janus',
  templateUrl: './janus.component.html',
  styleUrls: ['./janus.component.css', '../../assets/css/styles.css']
})
export class JanusComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

}
