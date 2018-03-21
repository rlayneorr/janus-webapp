import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  alertMessage: string;
  alertType: string;
  timeout = new Subject<string>();
  timeoutTime = 5000;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.timeout.subscribe();
    debounceTime.call(this.timeout, this.timeoutTime).subscribe(() => this.alertMessage = null);
    this.alertService.messageObservable.subscribe(data => {
      this.timeout.next();
      this.alertType = data[0];
      this.alertMessage = data[1];
    });
  }

}
