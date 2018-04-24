import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../../../environments/environment';
/**
 * This just hosts a subject where people can broadcast messages to all subscribers
 */
@Injectable()
export class AlertService {
  private alerts = new ReplaySubject<string>(3);
  public alerts$ = this.alerts.asObservable();

  publishAlert(alert: string) {
    if (environment.production) {
      this.alerts.next('An Error Has Occurred');
    } else {
      this.alerts.next('An exception was thrown by the following endpoint: ' + alert);
    }
  }

}
