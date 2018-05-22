import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ErrorAlertComponent } from '../hydra-client/ui/error-alert/error-alert.component';
import { HydraInterceptor } from '../hydra-client/interceptors/hydra.interceptor';

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
