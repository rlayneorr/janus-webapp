import { Component, OnInit, Input, ViewContainerRef, OnChanges, Injectable } from '@angular/core';
import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { HydraInterceptor } from '../../interceptors/hydra.interceptor';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// new notif imports
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import { AlertService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})

export class ErrorAlertComponent implements OnInit {

  private subscription: Subscription;

  constructor(private alertServ: AlertService, public toastr: ToastsManager, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(this.vcr);
    this.subscription = this.alertServ.alerts$.subscribe( err => {
      this.showError(err);
    });
  }

  ngOnInit() {
  }

  showError(messages: any) {
    this.toastr.error(messages, 'Error');
  }

}
