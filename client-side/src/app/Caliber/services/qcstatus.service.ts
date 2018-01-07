import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { AbstractApiService } from './abstract-api.service';
import { EnvironmentService } from './environment.service';
import { AlertsService } from './alerts.service';

@Injectable()
export class QCStatusService extends AbstractApiService<string> {

  constructor(
    envService: EnvironmentService,
    http: HttpClient,
    alertService: AlertsService
  ) {
    super(envService, http, alertService);

    this.fetchAll();
  }

  /**
   * retrieve all QCStatus types
   */
  public fetchAll(): void {
    const url = 'types/qcstatus/all';
    const messages = {
      success: 'QC Status types retrieved successfully',
      error: 'QC Status types retrieval failed',
    };

    super.doGetList(url, {}, messages);
  }

}
