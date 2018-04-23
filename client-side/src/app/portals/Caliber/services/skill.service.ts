import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { environment } from '../../../../environments/environment';
import { Fetch } from '../interfaces/api.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { urls } from './urls';


/**
 * manages API calls for skills
 */
@Injectable()
export class SkillService implements Fetch<string> {

  public listSubject = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {


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
  * retrievs all skills and pushes them on the listSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'STAGING','TRAINER','QC','PANEL')")
  */
  public fetchAll() {
    this.httpClient.get<string[]>(urls.skill.fetchAll()).subscribe(res => this.listSubject.next(res));
    return this.listSubject.asObservable();
  }
}
