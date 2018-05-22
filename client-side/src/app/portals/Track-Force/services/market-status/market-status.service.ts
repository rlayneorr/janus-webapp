import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { MarketingStatus } from '../../models/marketing-status.model';

/**
 * @author Nathaniel Blanchard
 * @description methods for grabbing data from api for Curriculum
 */

@Injectable()
export class MarketStatusService {
  private url: string = environment.msurl + '8094';

  constructor(private http: HttpClient) { }

  getAllMarketingStatus(): Observable<any> {
    return this.http.get(this.url + '/all/marketingstatus');
  }

  getAllMarketingStatusMapped(): Observable<any> {
    return this.http.get(this.url + '/all/marketingstatus/mapped');
  }

  getOneMarketingStatus(name: string): Observable<any> {
    return this.http.get(this.url + '/one/marketingstatus/' + name);
  }

  getMarketingStatusById(id: number): Observable<any> {
    return this.http.get(this.url + '/one/marketingstatus/byid/' + id);
  }
  createMarketingStatus(marketingStatus: MarketingStatus): Observable<any> {
    return this.http.post(this.url + '/add/marketingstatus', {marketingStatus: marketingStatus});
  }

  updateMarketingStatus(marketingStatus: MarketingStatus, id: number): Observable<any> {
    return this.http.put(this.url + '/update/marketingstatus' +  id, {marketingStatus: marketingStatus});
  }

  deleteMarketingStatus(id: number): Observable<any> {
    return this.http.delete(this.url + '/delete/marketingstatus/' + id);
  }

}
