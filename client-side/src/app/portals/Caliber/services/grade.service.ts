import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../../environments/environment';
import { AlertsService } from './alerts.service';

// entities
import { Grade } from '../entities/Grade';
import { CRUD } from '../interfaces/api.interface';
import { urls } from './urls';
import { stringifyDate } from '../util/utils';

/**
* this service manages calls to the web services
* for Grade objects
*/
@Injectable()
export class GradeService implements CRUD<Grade> {

  public listSubject = new BehaviorSubject<Grade[]>([]);
  public saveSubject = new Subject<Grade>();

  constructor(private httpClient: HttpClient) {
  }

  /*
   =====================
   BEGIN: API calls
   =====================
 */

  public fetchAll() { return this.listSubject.asObservable(); }

  /**
  * retrieves all grades by batch ID by week and pushes them on the
  * list subject
  *
  * NOTE: structure of the data returned is unorthodox
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
  *
  * @param batchId: number
  * @param week: number
  *
  */

  public fetchByBatchIdByWeek(batchId: number, week: number): void {
    this.httpClient.get<any>(urls.grade.fetchByBatchIdByWeek(batchId, week))
      .subscribe(grades => {
        const extractedGrades: Grade[] = [];
        /*
        * the API behind this call retrieves grades like:
        *
        * {
        *   ${traineeId}: [
        *     Grade1,
              Grade2,
        *   ],
            ${traineeId}: [
              Grade1,
              Grade2,
            ],
        *   ...
        * }
        */
        for (const traineeId in grades) {
          if (grades.hasOwnProperty(traineeId)) {
            for (const grade of grades[traineeId]) {
              extractedGrades.push(grade);
            }
          }
        }
        this.listSubject.next(extractedGrades);
      });
  }

  /**
   * @overload
   *
   * @see save()
   *
   * transmits a new Grade to be created and pushes the
   * created Grade on the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param grade: Grade
   */
  public create(grade: Grade): Observable<Grade> {
    return this.save(grade);
  }


  /**
   * transmits a new Grade to be created and pushes the
   * created Grade on the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param grade: Grade
   */
  public save(grade: Grade): Observable<Grade> {
    this.httpClient.post<Grade>(urls.grade.save(), this.prepareForApi(grade)).subscribe(res => this.saveSubject.next(res));
    return this.saveSubject.asObservable();
  }

  /**
   * transmits a Grade to be updated and pushes the updated
   * version of the Grade on the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER','PANEL')")
   *
   * @param grade: Grade
   */
  public update(grade: Grade): Observable<Grade> {
    this.httpClient.post<Grade>(urls.grade.update(), this.prepareForApi(grade)).subscribe(data => this.saveSubject.next(data));
    return this.saveSubject.asObservable();
  }

  public delete(grade: Grade): Observable<Grade> {
    return Observable.of(grade);
}

  /**
   * produces a clone of the grade object that
   * has changes required for the API in order
   * to be processed
   *
   * @param batch: Batch
   *
   * @return any
   */
  protected prepareForApi(grade: Grade) {
    const output: any = {};

    Object.assign(output, grade);

    output.dateReceived = stringifyDate(grade.dateReceived);
    return output;
  }

}
