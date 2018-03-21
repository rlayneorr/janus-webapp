import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { urls } from './urls';

// Interfaces
import { Fetch } from '../interfaces/api.interface';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


/**
 * manages API calls for TraineeStatuses
 */
@Injectable()
export class TraineeStatusService implements Fetch<string> {

  public listSubject: BehaviorSubject<any[]>;

  constructor(public http: HttpClient, alertService: AlertsService) {
    // super(httpClient, alertService);
    this.listSubject = new BehaviorSubject([]);
    this.initialize();
  }

  /**
   * perform initialization processes
   */
  private initialize(): void {
    this.fetchAll();
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
  * retrieves all skills and pushes them on the listSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'STAGING','TRAINER','QC','PANEL')")
  */
  public fetchAll(): Observable<string[]> {
     this.http.get<string[]>(urls.traineeStatus.fetchAll()).subscribe((data) => this.listSubject.next(data));
     return this.listSubject.asObservable();
  }

}
