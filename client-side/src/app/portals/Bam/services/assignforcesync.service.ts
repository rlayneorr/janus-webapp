import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UrlService } from '../../../hydra-client/services/urls/url.service';


@Injectable()
export class AssignforcesyncService {
  constructor(private http: HttpClient, private urlService: UrlService) { }

  /**
   * Pulls from the Assign force DB and populates the BAM DB
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param
   */
  refreshBatches() {
    this.http.get(this.urlService.assignForce.refreshBatches()).map(
      data => {
        return data;
      }
    );
  }
}
