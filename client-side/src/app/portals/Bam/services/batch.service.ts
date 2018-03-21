import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BatchType } from '../models/batchtype.model';
import { environment } from '../../../../environments/environment';
import { Batch } from '../models/batch.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()

export class BatchService {
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all the batches from the DB
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param
   */
  getBatchAll(): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.bambatch.getBatchAllUrl()).map(
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
  getPastBatches(email: string): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.bambatch.getPastBatchesUrl(email)).map(
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
  getFutureBatches(email: string): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.bambatch.getFutureBatchesUrl(email)).map(
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
    return this.http.get<Batch>(environment.bambatch.getBatchInProgressUrl(email)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves all current batches for a given trainer
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns Batch[]
   * @param email: string
   */
  getAllBatchesInProgress(email: string): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.bambatch.getAllBatchesInProgressUrl(email)).map(
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
    return this.http.get<Batch>(environment.bambatch.getBatchByIdURL(bid)).map(
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
    return this.http.post(environment.bambatch.updateBatchUrl(), batch, httpOptions).map(
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
    return this.http.get<BatchType[]>(environment.bambatch.getAllBatchTypesUrl()).map(
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
    return this.http.get<Batch[]>(environment.bambatch.getAllInProgressUrl()).map(
      data => {
        return data;
      }
    );
  }

}
