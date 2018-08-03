import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// services
import {AlertsService} from './alerts.service';
import {UrlService} from '../../../caliber-client/services/urls/url.service';
// Interfaces
import {CRUD} from '../interfaces/api.interface';
// rxjs
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
// entities
import {Trainee} from '../entities/Trainee';

const context = (new UrlService).trainee;

/**
 * This service manages calls to the web service
 * for Trainee objects
 */
@Injectable()
export class TraineeService implements CRUD<Trainee> {

  public listSubject: BehaviorSubject<Trainee[]>;
  public savedSubject: Subject<Trainee>;
  public updatedSubject: Subject<Trainee>;
  public deletedSubject: Subject<Trainee>;

  constructor(public http: HttpClient, public alertService: AlertsService) {
    // super(httpClient, alertService);
    this.listSubject = new BehaviorSubject([]);
    this.savedSubject = new Subject();
    this.updatedSubject = new Subject();
    this.deletedSubject = new Subject();
   }

  /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
   * retrieves all trainees by batch ID and pushes them on the
   * list subject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING', 'PANEL')")
   *
   * @param batchId: number
   */
  public fetchAllByBatch(batchId: number): void {
    this.fetchAll(batchId);
  }

   public fetchAll(batchId: number) {
    this.http.get<any[]>(context.fetchAllByBatch(batchId))
       .subscribe((results) => this.listSubject.next(results));
     return this.listSubject.asObservable();
  }

  fetchDroppedByBatch(batchId: number) {
    return this.http.get<any[]>(context.fetchDroppedByBatch(batchId));
  }

  /**
   * creates a trainee and pushes the created trainee on the
   * savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
   *
   * @param trainee: Trainee
   */
  public create(trainee: Trainee) {
    this.http.post<any>(context.save(), JSON.stringify(trainee))
      .subscribe((results) => this.savedSubject.next(results));
    return this.savedSubject.asObservable();
  }

  /**
   * Function that pushes a trainee into savedSubject
   */
  public pushToSaved(trainee: Trainee) {
    this.savedSubject.next(trainee);
  }

  /**
   * Given a trainee object, updates it on the database and returns the updated trainee.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param trainee: Trainee
   */
  public update(trainee: Trainee) {
    this.http.put<any>(context.update(), JSON.stringify(trainee))
      .subscribe((results) => this.savedSubject.next(results));
    return this.savedSubject.asObservable();
  }

  /**
   * Deletes a trainee and pushes the deleted trainee on the
   * deletedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param trainee: Trainee
   */
  public delete(trainee: Trainee) {
    this.http.delete((new UrlService).batches.delete(trainee.traineeId))
      .subscribe((results: any) => this.deletedSubject.next(results));
    return this.deletedSubject.asObservable();
  }
}
