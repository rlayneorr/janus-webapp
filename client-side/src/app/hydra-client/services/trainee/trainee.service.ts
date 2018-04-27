import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../urls/url.service';
import { Trainee } from '../../entities/Trainee';
import { Subject } from 'rxjs/Subject';

/**
 * This service is used for consuming Hydra API resources dealing with trainees.
 *
 * @export
 * @class HydraTraineeService
 */
@Injectable()
export class TraineeService {

  public savedSubject: Subject<Trainee>;

  constructor(private httpClient: HttpClient, private urlService: UrlService) {this.savedSubject = new Subject(); }

  /**
   * Requests all trainees with the input batch id and returns an observable.
   *
   * Possibly a legacy function so we did not consolidate this with fetchAllByBatch (Blake's class, 1801)
   *
   * @param batchId
   * @param status
   *
   * @returns {Observable<Trainee[]>}
   */
  public findAllByBatchAndStatus(id: number, status: string): Observable<Trainee[]> {
    const url = this.urlService.trainees.findAllByBatchAndStatus(id, status);
    return this.httpClient.get<Trainee[]>(url);
  }

    /**
   * Requests all trainees with the input batch id and returns an observable.
   *
   * @param batchId
   *
   * @returns {Observable<Trainee[]>}
   */
  public findAllByBatch(id: number): Observable<Trainee[]> {
    const url = this.urlService.trainees.findAllByBatch(id);
    return this.httpClient.get<Trainee[]>(url);
  }
  /**
  * Saves the newly created trainee and returns the Observable.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'PANEL')")
  *
  * @param trainee: HydraTrainee
  * @returns {Observable<Trainee>}
  */
  public create(trainee: Trainee): Observable<Trainee> {
    const url = this.urlService.trainees.save();
    return this.httpClient.post<Trainee>(url, trainee);
  }

  /**
   * Updates a trainee and returns the Observable.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param trainee: HydraTrainee
   * @returns {Observable<Trainee>}
   */
  public update(trainee: Trainee): Observable<Trainee> {
    const url = this.urlService.trainees.update();
    return this.httpClient.put<Trainee>(url, trainee);
  }

  /**
  * Deletes a trainee and returns the Observable.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
  *
  * @param trainee: HydraTrainee
  * @returns {Observable<Trainee>}
  */
  public delete(traineeId: number): Observable<Trainee> {
    const url = this.urlService.trainees.delete(traineeId);
    return this.httpClient.delete<Trainee>(url);
  }
}
