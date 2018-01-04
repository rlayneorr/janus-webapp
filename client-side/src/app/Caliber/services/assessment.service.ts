import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// services
import { AbstractApiService } from './abstract-api.service';
import { EnvironmentService } from './environment.service';

// entities
import { Assessment } from '../entities/Assessment';


/**
 * this service manages calls to the web service
 * for Assessment objects
 */
@Injectable()
export class AssessmentService extends AbstractApiService<Assessment> {

  constructor(eService: EnvironmentService, httpClient: HttpClient) {
    super(eService, httpClient);
  }

   /*
    =====================
    BEGIN: API calls
    =====================
  */

  /**
     * retrieves all assessments by batch ID by week number and pushes them
     * on the list subject
     *
     * @param batchId: number
     * @param week: number
     */
  public fetchByBatchIdByWeek(batchId: number, week: number): void {
    const url = `trainer/assessment/${batchId}/${week}`;

    super.doGetList(url);
  }

  /**
   * @overload
   *
   * @see save()
   *
   * creates an assessment and pushes the created assessement on
   * the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER')")
   *
   * @param assessment: Assessment
   */
  public create(assessment: Assessment): void {
    this.save(assessment);
  }

 /**
 * creates an assessment and pushes the created assessement on
 * the savedSubject
 *
 * NOTE: the createAssessment on the AssessmentController does NOT
 * return the created assessment object with the generated ID so
 * this is going to fake it
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'TRAINER')")
 *
 * @param assessment: Assessment
 */
  public save(assessment: Assessment): void {
    const url = this.envService.buildUrl('trainer/assessment/create');
    const body = JSON.stringify(assessment);
    let subscription: Subscription;

    this.http.post<void>(url, body, { responseType: 'text'} ).subscribe( () => {}, (error) => {
      this.fetchByBatchIdByWeek(assessment.batch.batchId, assessment.week);

      this.listSubject.subscribe( (list) => {
        //subscription.unsubscribe();

        const matches = list.filter( (value) => {
          switch (true) {
            case ( value.title !== assessment.title ) :
            case ( value.rawScore !== assessment.rawScore ) :
            case ( value.type !== assessment.type ) :
            case ( value.category !== assessment.category ) :
              return false;
            default:
              return true;
          }
        });

        /*
        * reverse sort with the highest id value on top
        */
        matches.sort( (a, b) => {
          switch (true) {
            case ( a.assessmentId > b.assessmentId ):
              return -1;
            case ( a.assessmentId < b.assessmentId ):
              return 1;
            default:
              return 0;
          }
        });

        console.log(matches);

        this.savedSubject.next(matches[0]);
      });
    });
  }

  /**
   * updates an assessment and pushes the updated assessment on the
   * savedSubject
   *
   * spring-security: <null>
   *
   * @param assessment: Assessment
   */
  public update(assessment: Assessment): void {
    const url = 'trainer/assessment/update';

    super.doPut(assessment, url);
  }

  /**
   * deletes an assessment and pushes the deleted assessment on the
   * deletedSubject
   *
   * spring-security: <null>
   *
   * @param assessment: Assessment
   */
  public delete(assessment: Assessment): void {
    const url = `trainer/assessment/delete/${assessment.assessmentId}`;

    super.doDelete(assessment, url);
  }




}
