import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { UrlService } from '../../../gambit-client/services/urls/url.service';

// Interfaces
import { Fetch } from '../interfaces/api.interface';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/**
 * Manages API calls for TraineeStatuses
 */
@Injectable()
export class TraineeStatusService implements Fetch<string> {

  public listSubject: BehaviorSubject<any[]>;
  private urlService = new UrlService();
  constructor(public http: HttpClient, alertService: AlertsService) {
    // super(httpClient, alertService);
    this.listSubject = new BehaviorSubject([]);
    this.initialize();
  }

  /**
   * Perform initialization processes
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
   * Retrieves all skills and pushes them on the listSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'STAGING','TRAINER','QC','PANEL')")
   */
  public fetchAll(): Observable<string[]> {
     this.http.get<string[]>(this.urlService.traineeStatus.fetchAll()).subscribe((data) => this.listSubject.next(data));
     return this.listSubject.asObservable();
  }

}
