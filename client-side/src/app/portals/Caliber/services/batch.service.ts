import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaces
import { CRUD } from '../interfaces/api.interface';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { ApiService } from '../util/api.service';
import { environment } from '../../../../environments/environment';

// entities
import { Batch } from '../entities/Batch';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { urls } from './urls';
import { stringifyDate } from '../util/utils';

/**
 * This service manages HTTP requests to the web service for Batch objects
 */
@Injectable()
export class BatchService implements CRUD<Batch> {

  /**
   * 1802Java-Nick says: WHY IS A LIST OF BATCHES NAMED LISTSUBJECT??!
   * TODO: Rename every instance of Subject in this file to Batch.
   * It was originally named Subject because it uses the Rxjs Subject type.
   */
  public listSubject: BehaviorSubject<Batch[]>;
  public savedSubject: Subject<Batch>;
  public updatedSubject: Subject<Batch>;
  public deletedSubject: Subject<Batch>;

  constructor(public http: HttpClient, public apiService: ApiService) {
    this.listSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.updatedSubject = new Subject();
    this.deletedSubject = new Subject();
  }

  /**
   * Gets the current List of Batches. Needs a better function name.
   */
  public getList(): Observable<Batch[]> {
    return this.listSubject.asObservable();
  }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * Makes a get request for all training batches regardless of the trainer
   * and pushes them onto the listSubject list.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'STAGING', 'PANEL')")
   * @returns A list of all batches.
   */
  public fetchAll(): Observable<Batch[]> {
    this.http.get<any[]>(urls.batch.fetchAll()).subscribe(
      (results) => {
        this.listSubject.next(results);
      }
    );
    return this.listSubject.asObservable();
  }

  /**
   * Makes a get request for all batches that belong to the currently
   * authenticated trainer and pushes them onto the listSubject list.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'PANEL')")
   * @returns A list of all batches by the authenticated Trainer.
   */
  public fetchAllByTrainer() {
    this.http.get<any[]>(urls.batch.fetchAllByTrainer()).subscribe(
      (results) => {
        this.listSubject.next(results);
      }
    );
  }

  /**
  * @overloaded
  * @see save()
  *
  * Makes a post request to save a batch in persistent storage on the server
  * and pushes the saved object onto the savedSubject list.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
  * @param batch The Batch to be saved.
  * @returns The Batch created with the id and starting values initialized.
  */
  public create(batch: Batch): Observable<Batch> {
    const batchClone = JSON.stringify(this.prepareForApi(batch));
    this.http.post<any>(urls.batch.save(), batchClone).subscribe(
      (results) => {
        this.savedSubject.next(results);
      }
    );
    return this.savedSubject.asObservable();
  }

  /**
   * Makes a put request for the specified Batch and
   * pushes the updated object onto the savedSubject list.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
   * @param batch The edited Batch.
   * @returns The edited Batch if successful.
   */
  public update(batch: Batch): Observable<Batch> {
    const batchClone = JSON.stringify(this.prepareForApi(batch));
    this.http.put<any>(urls.batch.update(), batchClone).subscribe(
      (results) => {
        this.savedSubject.next(results);
      }
    );
    return this.savedSubject.asObservable();
  }

  /**
   * Makes a delete request on the specified Batch and
   * pushes the deleted object onto the deletedSubject list.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   * @param batch The Batch to delete.
   * @returns The deleted Batch.
   */
  public delete(batch: Batch): Observable<Batch> {
    this.http.delete(urls.batch.delete(batch.batchId)).subscribe(
      (results: any) => {
        this.deletedSubject.next(results);
      }
    );
    return this.deletedSubject.asObservable();
  }

  /**
   * Creates a clone of the batch object with the startDate and endDate
   * converted to String, so the API can process it.
   *
   * @param batch The Batch object to convert.
   * @return The Batch object in API-readable form.
   */
  protected prepareForApi(batch: Batch): any {
    const output: any = {};
    Object.assign(output, batch);

    output.startDate = stringifyDate(batch.startDate);
    output.endDate = stringifyDate(batch.endDate);

    return output;
  }
}
