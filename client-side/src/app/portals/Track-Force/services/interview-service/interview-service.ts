import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { Interview } from '../../models/interview.model';

/**
 * @author Nathaniel Blanchard
 * @description methods for grabbing data from api for Curriculum
 */

@Injectable()
export class InterviewService {
  private url: string = environment.msurl + '8092';

  constructor(private http: HttpClient) { }

  getAllInterviews(): Observable<any> {
    return this.http.get(this.url + '/all/interview/');
  }

  getAllInterviewByAssociate(associateId: number): Observable<any> {
    return this.http.get(this.url + '/all/interview/associate/' + associateId);
  }

  createInterview(interview: Interview, associateId: number): Observable<any> {
    return this.http.post(this.url + '/add/interview/associate/', {interview: interview, id: associateId});
  }

  updateInterview(interview: Interview, id: number): Observable<any> {
    return this.http.put(this.url + '/update/interview/' +  id, {interview: interview});
  }

  deleteInterview(id: number): Observable<any> {
    return this.http.delete(this.url + '/delete/interview/' + id);
  }

}
