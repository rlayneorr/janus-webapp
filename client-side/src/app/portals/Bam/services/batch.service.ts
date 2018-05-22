import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BatchType } from '../models/batchtype.model';
import { Batch } from '../models/batch.model';
import { UrlService } from '../../../hydra-client/services/urls/url.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()

export class BatchService {
  constructor(private http: HttpClient, private urlService: UrlService) { }

  /**
   * Retrieves all the batches from the DB
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param
   */
  getBatchAll(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.urlService.bambatch.getBatchAllUrl()).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all past batches for a given trainer
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param email: string
   */
  getPastBatches(trainerId: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.urlService.bambatch.getPastBatchesUrl(trainerId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all future batches for a given trainer
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param email: string
   */
  getFutureBatches(trainerId: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.urlService.bambatch.getFutureBatchesUrl(trainerId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves current batch for a given trainer
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch
   * @param email: string
   */
  getBatchInProgress(email: string): Observable<Batch> {
    return this.http.get<Batch>(this.urlService.bambatch.getBatchInProgressUrl(email)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all current batches for a given trainer
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param trainerId: number
   */
  getAllBatchesInProgress(trainerId: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.urlService.bambatch.getAllBatchesInProgressUrl(trainerId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves a batch by it's batch id
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch
   * @param bid: number
   */
  getBatchById(bid: number): Observable<Batch> {
    return this.http.get<Batch>(this.urlService.bambatch.getBatchByIdURL(bid)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Updates a batch
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param batch: Batch
   */
  updateBatch(batch: Batch) {
    return this.http.post(this.urlService.bambatch.updateBatchUrl(), batch, httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all batch types
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns BatchType[]
   * @param
   */
  getAllBatchTypes(): Observable<BatchType[]> {
    return this.http.get<BatchType[]>(this.urlService.bambatch.getAllBatchTypesUrl()).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all active batches
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @returns Batch List
   */
  getAllInProgress(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.urlService.bambatch.getAllInProgressUrl()).map(
      data => {
        return data;
      }
    );
  }

}
