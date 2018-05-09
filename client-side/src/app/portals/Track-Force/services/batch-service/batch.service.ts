/** @Author Princewill Ibe */

import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Batch} from '../../models/batch.model';
import {Associate} from '../../models/associate.model';

@Injectable()
export class BatchService {
  // private batchPath: string = "TrackForce/api/batches";
  //
  // constructor(private http: HttpClient) {}
  //
  // /**
  //  * given start and end date, return the batches that started and completed
  //  * within the time range
  //  *
  //  * @param {Date} startDate
  //  * @param {Date} endDate
  //  * @returns {Observable<Batch[]>}
  //  */
  // public getBatchesByDate(startDate: Date, endDate: Date): Observable<Batch[]> {
  //   const url = environment.url + this.batchPath+ `?start=${startDate.getTime()}&end=${endDate.getTime()}`;
  //   //const url = environment.url + this.batchPath + '/';
  //   console.log(startDate.getTime());
  //   console.log(endDate.getTime());
  //   return this.http.get<Batch[]>(url);
  // }
  //
  // /**
  //  *
  //  */
  // public getAllBatches(): Observable<Batch[]> {
  //   const url = environment.url + this.batchPath;
  //   return this.http.get<Batch[]>(url);
  // }
  //
  // /**
  //  * get batches within six months of current
  //  *
  //  * @returns {Observable<Batch[]>}
  //  */
  // public getDefaultBatches(): Observable<Batch[]> {
  //   const now: Date = new Date();
  //   // all batches will be over by then
  //   const monthRadius = 3;
  //   const threeMonthsBefore = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   threeMonthsBefore.setMonth(threeMonthsBefore.getMonth() - monthRadius);
  //   const threeMonthsAfter = new Date(now.getFullYear(), now.getMonth(), 28);
  //   threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + monthRadius);
  //
  //   return this.getBatchesByDate(threeMonthsBefore, threeMonthsAfter);
  // }
  //
  // /**
  //  * as the name suggests, fetches list of associates in the batch with given id
  //  * @param {number} id
  //  * @returns {Observable<Associate[]>}
  //  */
  // public getAssociatesForBatch(id: number): Observable<Associate[]> {
  //   const url = environment.url + this.batchPath+'/'+id+'/associates';
  //   return this.http.get<Associate[]>(url);
  // }
  //
  // public getBatchesSortedById(): Observable<any> {
  //   return this.http.get(this.batchPath + '?sorted=id');
  // }
  //
  // public getBatchesSortedByDate(): Observable<any> {
  //   return this.http.get(this.batchPath + '?sorted=date');
  // }
  //
  // public getBatchByType(threeMonthsBefore: number, threeMonthsAfter: number, type: string): Observable<any> {
  //   return this.http.get<any>(this.batchPath + '?start=' + threeMonthsBefore + '&end=' + threeMonthsAfter + '&type='+type);
  // }

  private url: string = environment.msurl + '8095';

  constructor(private http: HttpClient) { }

  getBatchByName(name: string): Observable<any> {
    return this.http.get(this.url + '/one/batch/byname/' + name);
  }

  getBatchById(id: number): Observable<any> {
    return this.http.get(this.url + '/one/batch/byid/' + id);
  }
  getCurrIdById(id: number): Observable<any> {
    return this.http.get(this.url + '/one/batch/curriculum/' + id);
  }
  getAllBatchesOrdered(): Observable<any> {
    return this.http.get(this.url + '/all/batch/ordered');
  }

  getAllBatchesMapped(): Observable<any> {
    return this.http.get(this.url + '/all/batch/mapped');
  }

  getAllBatchesSet(): Observable<any> {
    return this.http.get(this.url + '/all/batch/set');
  }

  addBatch(batch: Batch): Observable<any> {
    return this.http.post(this.url + '/add/batch', {batch: batch});
  }

  updateBatchInfo(batch: Batch, id: number): Observable<any> {
    return this.http.put(this.url + '/update/batch/' + id, {batch: batch});
  }

  deleteBatch(id: number): Observable<any> {
    return this.http.delete(this.url + '/delete/batch/' + id);
  }

  getBatchLocationById(id: number): Observable<any> {
    return this.http.get(this.url + '/one/batchlocation/byid/' + id);
  }

    /**
   * get batches within six months of current
   *
   * @returns {Observable<Batch[]>}
   */
  public getDefaultBatches(): Observable<Batch[]> {
    const now: Date = new Date();
    // all batches will be over by then
    const monthRadius = 3;
    const threeMonthsBefore = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    threeMonthsBefore.setMonth(threeMonthsBefore.getMonth() - monthRadius);
    const threeMonthsAfter = new Date(now.getFullYear(), now.getMonth(), 28);
    threeMonthsAfter.setMonth(threeMonthsAfter.getMonth() + monthRadius);

    return this.getBatchesByDate(threeMonthsBefore, threeMonthsAfter);
  }

/**
   * given start and end date, return the batches that started and completed
   * within the time range
   *
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Observable<Batch[]>}
   */
  public getBatchesByDate(startDate: Date, endDate: Date): Observable<Batch[]> {
    // const url = environment.url + this.batchPath+ `?start=${startDate.getTime()}&end=${endDate.getTime()}`;
    const url = environment.msurl + this.url + '/all/batch/ordered';
    console.log(startDate.getTime());
    console.log(endDate.getTime());
    return this.http.get<Batch[]>(url);
  }

}
