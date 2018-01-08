import { Injectable } from '@angular/core';
import { AbstractApiService } from './abstract-api.service';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http/';
import { AlertsService } from './alerts.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportsService extends AbstractApiService<any> {

  constructor(envService: EnvironmentService, httpClient: HttpClient, alertService: AlertsService) {
    super(envService, httpClient, alertService);
  }

   /**
  * Retrieves information for the vp-home-bar-chart
  *
  * @return Observable<any[]>
  */
  public fetchReportsStackedBarCurrentWeek(): Observable<any[]> {
    const url = 'all/reports/batch/week/stacked-bar-current-week';

    return super.doGetListObservable(url);
  }

  /**
   * Retrieves all information for the vp-home-line-chart
   *
   * @returns Observable<any[]>
   */
  public fetchReportsDashboard(): Observable<any[]> {
    const url = 'all/reports/dashboard';

    return super.doGetListObservable(url);
  }

  /**
   * Retrieves all information for the vp-home-panel-line-chart
   *
   * @returns Observable<any[]>
   */
  public fetchReportsBiWeeklyPanel(): Observable<any[]> {
    const url = 'all/reports/biweeklyPanelResults';

    return super.doGetListObservable(url);
  }
}
