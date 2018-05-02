import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../../environments/environment';

// entities
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { UrlService } from '../urls/url.service';           // TODO refactor reference to Environments?
import { stringifyDate } from '../../../portals/Caliber/util/utils';
import { HydraBatch } from '../../entities/HydraBatch';
import { HydraCRUD } from '../../interfaces/api.interface';

import { GambitBatch } from '../../entities/GambitBatch';



/**
 * this service manages calls to the web service
 * for Batch objects
 */
@Injectable()
export class HydraBatchService {

  constructor(public http: HttpClient, private urls: UrlService) {

  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * retrieves all training batches regardless of the trainer
   * and returns the HTTP request as an Observable
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'STAGING', 'PANEL')")
   *
   * @returns Observable
   */
  public fetchAll() {
    return this.http.get<GambitBatch[]>(this.urls.batches.fetchAll());
  }

  /**
   * retrieves the batches that belong to the currently
   * authenticated trainer and returns the HTTP request as an Observable
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'PANEL')")
   *
   * @returns Observable
   */
  public fetchAllByTrainerId(id: number) {
    return this.http.get<GambitBatch[]>(this.urls.batches.fetchAllByTrainerId(id));
  }

  /**
  * @overloaded
  * @see save()
  *
  * transmits a batch to be saved in persistent
  * storage on the server and returns the HTTP request as an Observable
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
  *
  * @param batch: Batch
  */
  public create(batch: GambitBatch) {
    return this.http.post<GambitBatch>(this.urls.batches.save(), JSON.stringify(this.prepareForApi(batch)));
  }




  /**
   * transmits a Batch object to be updated and
   * returns the HTTP request as an Observable
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
   *
   * @param batch: Batch
   *
   * @returns Observable
   */
  public update(batch: GambitBatch) {
    return this.http.put<GambitBatch>(this.urls.batches.update(), JSON.stringify(this.prepareForApi(batch)));
  }

  /**
   * transmits a batch object to be deleted and
   * returns the HTTP request as an Observable
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param batch: Batch
   *
   * @returns Observable
   */
  public delete(batch: GambitBatch) {
    return this.http.delete<GambitBatch>(this.urls.batches.delete(batch.batchId));
  }

  /**
   * produces a clone of the batch object that
   * has changes required for the API in order
   * to be processed
   *
   * @param batch: Batch
   *
   * @return any
   */
  protected prepareForApi(batch: GambitBatch) {
    // let output: GambitBatch = {};
    // Object.assign(output, batch);

    // output.startDate = stringifyDate(batch.startDate);
    // output.endDate = stringifyDate(batch.endDate);

    // return output;
  }

}
