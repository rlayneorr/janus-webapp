import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';
import { urls } from './urls';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsService {

  constructor(public http: HttpClient) {
    // super(httpClient, alertService);
  }

  /**
   * Retrieves information for the vp-home-bar-chart
   * @returns {Observable<any[]>}
   * @memberof ReportsService
   */
  public fetchReportsStackedBarCurrentWeek(): Observable<any[]> {
    return this.http.get<any>(urls.reportsStackedBarCurrentWeek);
  }

  /**
   * Retrieves all information for the vp-home-line-chart
   * @returns {Observable<any[]>}
   * @memberof ReportsService
   */
  public fetchReportsDashboard(): Observable<any[]> {
    return this.http.get<any>(urls.reportsDashBoard);
  }

  /**
   * Retrieves all information for the vp-home-panel-line-chart
   * @returns {Observable<any[]>}
   * @memberof ReportsService
   */
  public fetchReportsBiWeeklyPanel(): Observable<any[]> {
    return this.http.get<any>(urls.reportsBiWeeklyPanel);
  }
}
