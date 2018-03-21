import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Subtopic } from '../models/subtopic.model';
import { Batch } from '../models/batch.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AddSubtopicService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves current batch information
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  getBatchById(id: number): Observable<Batch> {
    return this.http
        .get<Batch>(environment.addsubtopics.getBatchIdUrl(id))
        .map( data => {
          return data;
        });
  }

  /**
   * Retrieves all the subtopics of the current batch
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  getBatchSubtopics(id: number): Observable<Subtopic[]> {
    return this.http
        .get<Subtopic[]>(environment.addsubtopics.getBatchSubtopicsUrl(id, 34, 0))
        .map( data => {
          return data;
        });
  }

  /**
   * Updates old date on the database with the new date selected
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param batchId current batch id
   * @param subtopicId subtopic id
   * @param date date of the subtopic
   */
  updateDate(subtopicId, batchId, date): Observable<any> {
    return this.http.post<any>(environment.addsubtopics.updateDateUrl(subtopicId, batchId, date), '' , httpOptions);
  }

  /**
   * Obtains all the subtopics from the database
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  getSubtopicPool(): Observable<any> {
    return this.http
        .get<any>(environment.addsubtopics.getSubtopicPoolUrl())
        .map( data => {
          return data;
        });
  }

  /**
   * Sends a subtopic object to be persisted to the database
   * @param subtopic subtopic object
   */
  addSubtopic(subtopic): Observable<Subtopic> {
    return this.http.post<Subtopic>(environment.addsubtopics.addSubtopicUrl(), JSON.stringify(subtopic), httpOptionsJson);
  }

}
