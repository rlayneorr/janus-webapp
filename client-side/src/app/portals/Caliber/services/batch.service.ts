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
import { Ng2PageScrollModule } from 'ng2-page-scroll';


/**
 * this service manages calls to the web service
 * for Batch objects
 */
@Injectable()
export class BatchService implements CRUD<Batch> {

    public listSubject: BehaviorSubject<Batch[]>;
    public batches: Batch[];
    public savedSubject: Subject<Batch>;
    public updatedSubject: Subject<Batch>;
    public deletedSubject: Subject<Batch>;

    constructor(public http: HttpClient, public apiService: ApiService) {
      this.listSubject = new BehaviorSubject([]);
      this.savedSubject = new Subject();
      this.updatedSubject = new Subject();
      this.deletedSubject = new Subject();
    }

    public getList() {
      // this.listSubject.next(data);
      return this.listSubject.asObservable();
    }

    /*
      =====================
      BEGIN: API calls
      =====================
    */

    /**
     * retrieves all training batches regardless of the trainer
     * and pushes them on the list subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'STAGING', 'PANEL')")
     */
    public fetchAll(): Observable<Batch[]> {
      this.http.get<any[]>(urls.batch.fetchAll())
        .subscribe((results) => {
          for (let result in results) {
            this.http.get<any[]>(urls.skill.fetchById(result['skillTypeId'])).subscribe(res => {
              this.batches.push({
                batchId: result['batchId'],
                resourceId: result['resourceId'],
                trainingName: result['trainingName'],
                trainer: result['trainerId'],
                coTrainer: result['cotrainerId'],
                skill: res['skills'],
                skillType: res['skillTypeName'],
                trainingType: result['trainingType'],
                startDate: result['startDate'],
                endDate: result['endDate'],
                location: result['location'],
                address: result['address'],
                goodGradeThreshold: null,
                borderlineGradeThreshold: null,
                trainees: result['traineeId'],
                weeks: null,
                gradedWeeks: null
              });
            });
          }
          this.listSubject.next(this.batches);
        });
      return this.listSubject.asObservable();
    }

    /**
     * retrieves the batches that belong to the currently
     * authenticated trainer and pushes them on the
     * list subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER', 'STAGING', 'PANEL')")
     */
    // public fetchAllByTrainer() {
    //   this.http.get<any[]>(urls.batch.fetchAllByTrainer())
    //   .subscribe((results) => {
    //     this.listSubject.next(results);
    // });
    // }

    /**
    * @overloade
    * @see save()
    *
    * transmits a batch to be saved in persistent
    * storage on the server and pushes the saved
    * object on the saved subject
    *
    * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
    *
    * @param batch: Batch
    */
    public create(batch: Batch): Observable<Batch> {
      this.http.post<any>(urls.batch.save(), JSON.stringify(this.prepareForApi(batch)))
      .subscribe((results) => {
        this.savedSubject.next(results);
        });
      return this.savedSubject.asObservable();
    }

    /**
     * transmits a Batch object to be updated and
     * pushes the updated object on th savedSubject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
     *
     * @param batch: Batch
     */
    public update(batch: Batch): Observable<Batch> {
      this.http.put<any>(urls.batch.update(), JSON.stringify(this.prepareForApi(batch)))
      .subscribe((results) => {
        this.savedSubject.next(results);
        });
      return this.savedSubject.asObservable();
    }

    /**
     * transmits a batch object to be deleted and
     * pushes the deleted object on the deleted
     * subject
     *
     * spring-security: @PreAuthorize("hasAnyRole('VP')")
     *
     * @param batch: Batch
     */
    public delete(batch: Batch): Observable<Batch> {
      this.http.delete(urls.batch.delete(batch.batchId))
      .subscribe((results: any) => {
        this.deletedSubject.next(results);
        });
      return this.deletedSubject.asObservable();
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
    // We should find a way to make this have an explicit non-any type
    protected prepareForApi(batch: Batch): any {
      let output: any = {};
      Object.assign(output, batch);

      output.startDate = stringifyDate(batch.startDate);
      output.endDate = stringifyDate(batch.endDate);

      return output;
    }
}
