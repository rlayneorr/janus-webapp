import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AlertsService } from './alerts.service';
import { ApiService } from '../util/api.service';
import { UrlService } from '../../../gambit-client/services/urls/url.service';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// entities
import { Panel } from '../entities/Panel';

// Interfaces
import { CRUD } from '../interfaces/api.interface';
import { GambitTrainee } from '../../../gambit-client/entities/GambitTrainee';

const context = (new UrlService).panel;

/**
* this service manages calls to the web services
* for Panel objects
*/
@Injectable()
export class PanelService implements CRUD<Panel> {

  listSubject: BehaviorSubject<Panel[]>;

  constructor(public http: HttpClient, public apiService: ApiService) {
    this.listSubject = new BehaviorSubject([]);
  }

  /*
   =====================
   BEGIN: API calls
   =====================
  */

 /**
  * Retrieves all panels and pushed them on the listSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  */
  public fetchAll(): Observable<Panel[]> {
    this.http.get<any[]>(context.fetchAll()).subscribe((results) => this.listSubject.next(results));
    return this.listSubject.asObservable();
  }

  /**
   * Retrieves all panels by trainee ID and pushes them on the
   * list subject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
   *
   * @param trainee: Trainee
   */
  public fetchAllByTrainee(trainee: GambitTrainee): Observable<Panel[]> {
    this.http.get<any[]>(context.fetchAllByTrainee(trainee.traineeId)).subscribe((results) => this.listSubject.next(results));
    return this.listSubject.asObservable();
  }

  /**
  * Creates a panel and pushes the created panel on the
  * savedSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP' , 'PANEL')")
  *
  * @param panel: Panel
  */
  public create(panel: Panel): Observable<Panel> {
    panel.status = 'Pass';
    return this.http.post<Panel>(context.save(), JSON.stringify(panel));
  }

  /**
  * updates a panel and pushes the updated panel on the
  * savedSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'PANEL')")
  *
  * @param panel: Panel
  */
  public update(panel: Panel): Observable<Panel> {
    return this.http.put<any>(context.update(), JSON.stringify(this.prepareForApi(panel)));
  }

  /**
  * Deletes a panel and pushes the deleted panel on the
  * deletedSubject
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'PANEL')")
  *
  * @param panel: Panel
  */
  public delete(panel: Panel): Observable<Panel> {
    return this.http.delete<any>(context.delete(panel.panelId));
  }

  /**
  * Produces a clone of the Panel object that
  * has changes required for the API in order
  * to be processed
  *
  * @param batch: Batch
  *
  * @return any
  */
  protected prepareForApi(panel: Panel) {
    const output: any = {};

    Object.assign(output, panel);

    output.interviewDate = this.apiService.stringifyDate(panel.interviewDate);

    return output;
  }

}
