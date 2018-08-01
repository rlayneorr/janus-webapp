import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../../../../caliber-client/services/urls/url.service';
import { User } from '../../models/user.model';

@Injectable()
export class RequestService {
  url = (new UrlService).context;
  trackPath: string = this.url + 'TrackForce/track';
  dataPath: string = this.url + 'TrackForce/track/data/get';
  /**
   * @param {HttpClient} http
   * Need to create a connection to REST endpoint
   * And initiate Http requests
   */
  constructor(private http: HttpClient) { }

  public populateDB(): Observable<any> {
    return this.http.get(this.url + 'TrackForce/track/database/populateDB');
  }

  public populateDBSF(): Observable<any> {
    return this.http.get(this.url + 'TrackForce/track/database/populateDBSF');
  }

  public deleteDB(): Observable<any> {
    return this.http.delete(this.url + 'TrackForce/track/database/deleteFromDB');
  }

  public getAssociates(): Observable<any> {
    return this.http.get(this.url + '/trainees');
  }


  public getClients(): Observable<any> {
    return this.http.get(this.dataPath + '/client');
  }

  public getTotals(): Observable<any> {
    return this.http.get(this.dataPath + '/summary');
  }

  public getStatuses(): Observable<any> {
    return this.http.get(this.url + '8094/all/marketingstatus');
  }

  // get first match of Client Object
  getOneClient(clientId: number): Observable<any> {
    return this.http.get(this.trackPath + '/clients/' + clientId);
  }
}
