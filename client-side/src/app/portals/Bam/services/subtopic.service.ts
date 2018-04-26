import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { SubtopicName } from '../models/subtopicname.model';
import { UrlService } from '../../../hydra-client/services/urls/url.service';
import { Observable } from 'rxjs/Observable';
import { Subtopic } from '../models/subtopic.model';
import { Topic } from '../models/topic.model';
import { SubtopicCurric } from '../models/subtopicCurric.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'}),
  observe: 'response' as 'response'
};

@Injectable()
export class SubtopicService {
  constructor(private http: HttpClient, private urlService: UrlService) { }

  /**
   * Gets a subtopic using a list of IDs
   * @author Trevor Fortner (1802-Matt)
   * @param subtopicId number
   */
  getSubtopicByIDs(subtopicIdList: number[]): Observable<Subtopic[]>  {
    return this.http.get<Subtopic[]>(this.urlService.subtopic.getSubtopicByIDs(subtopicIdList)).map(
      data => {
        return data;
      }
    );
  }

  getSubtopicByIDz(subtopicIdList: number[]): Observable<SubtopicCurric[]>  {
    return this.http.get<SubtopicCurric[]>(this.urlService.subtopic.getSubtopicByIDs(subtopicIdList)).map(
      data => {
        return data;
      }
    );
  }

  getSubtopicByID(subtopicId: number): Observable<any>  {
    return this.http.get<any>(this.urlService.subtopic.getSubtopicByID(subtopicId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Adds a subtopic to a topic.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @param subtopicName string
   * @param topicId number
   * @param typeId number
   */
  addSubTopicName(subtopicName: string, topicId: number, typeId: number) {
    return this.http.post<Topic>(this.urlService.subtopic.addSubTopicName(subtopicName, topicId, typeId), httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Calls API to remove subtopic from the batch
   * subtopicId is unique to the subtopic and batch relationship
   * @param subtopicId
   * @author Sean Sung | Batch: 1712-dec10-java-steve
   */
  removeSubtopicFromBatch(subtopicId: number) {
    return this.http.post(this.urlService.subtopic.removeSubtopic(subtopicId), httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Removes all subtopics from the given batch's calendar
   * @param batchId
   * @author Charlie Harris | Batch: 1712-dec11-java-steve
   */
  removeAllSubtopicsFromBatch(batchId: number) {
    return this.http.post(this.urlService.subtopic.removeAllSubtopics(batchId), httpOptions);
  }

  getAllSubtopics(): Observable<SubtopicCurric[]> {
    return this.http.get<SubtopicCurric[]>(this.urlService.subtopic.getSubtopics()).map(data => {
      return data;
    });
  }

  /**
   * Checks whether the given batch has any subtopics in its calendar
   * Returns request object with status 200 if the batch contains subtopics, 204 otherwise
   * @param batchId
   * @author Charlie Harris | Batch: 1712-dec11-java-steve
   */
  isPopulated(batchId: number) {
    return this.http.get(this.urlService.subtopic.isPopulated(batchId), httpOptions);
  }
}
