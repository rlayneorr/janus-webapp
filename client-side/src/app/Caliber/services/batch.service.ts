import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Batch } from '../entities/Batch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BatchService {
    private http: HttpClient;

    private listSubject: BehaviorSubject<Batch[]>;
    private savedSubject: Subject<Batch>;
    private deletedSubject: Subject<Batch>;

    constructor(httpClient: HttpClient) {
      this.http = httpClient;

      this.listSubject = new BehaviorSubject([]);
      this.savedSubject = new Subject();
      this.deletedSubject = new Subject();
    }

    /**
     * returns a behavior observable of the current 
     * batch list
     *
     * @return Observable<Batch[]>
     */
    public getList(): Observable<Batch[]> {
      return this.listSubject.asObservable();
    }

    /**
     * returns a publication observable of the last
     * saved batch object
     *
     * @return Observable<Batch>
     */
    public getSaved(): Observable<Batch> {
      return this.savedSubject.asObservable();
    }

    /**
     * returns a publication observable of the last
     * batch object deleted
     *
     * @return Observable<Batch>
     */
    public getDeleted(): Observable<Batch> {
      return this.deletedSubject.asObservable();
    }

    /*
      =====================
      BEGIN: API calls
      =====================
    */

    /**
     * retrieves the batches that belong to the currently
     * authenticated trainer and pushes them on the
     * list subject
     */
    public fetchAllByTrainer(): void {
      this.fetch('/trainer/batch/all');
    }

    /**
     * retrieves all training batches regardless of the trainer
     * and pushes them on the list subject
     *
     */
    public fetchAll(): void {
      this.fetch('/vp/batch/all');
    }

    /**
    * transmists a batch to be saved in persistent
    * storage on the server and pushes the saved
    * object on the saved subject
    *
    * @param batch: Batch
    */
    public create(batch: Batch): void {
      const url = '/all/batch/create';
      const data = JSON.stringify(batch);

      this.http.post<Batch>(url, data, { withCredentials: true })
        .subscribe((savedBatch) => {
          this.savedSubject.next(savedBatch);
        });
    }

    /**
     * transmits a batch object to be deleted and
     * pushes the deleted object on the deleted
     * subject
     *
     * @param batch
     */
    public delete(batch: Batch): void {
      const url = `/all/batch/delete/${ batch.batchId }`;

      this.http.delete<Batch>(url, { withCredentials: true })
        .subscribe( (deletedBatch) => {
          this.deletedSubject.next(deletedBatch);
        });
    }


    /*
      ============================
      BEGIN: helper functions
      ============================
     */

    /**
     * retrieves a list of batches using the url passed
     * and pushes them on the list subject
     *
     * @param url: string
     */
    private fetch(url: string) {

      this.http.get<Batch[]>(url, { withCredentials: true })
        .subscribe((batches) => {
          this.listSubject.next(batches);
        }, (error) => {
          this.listSubject.next([]);
        });

    }

}
