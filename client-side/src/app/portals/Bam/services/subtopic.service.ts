import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SubtopicName } from '../models/subtopicname.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'}),
  observe: 'response' as 'response'
};

@Injectable()
export class SubtopicService {
  constructor(private http: HttpClient) { }

  /**
   * Adds a subtopic to a topic.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @param subtopicName string
   * @param topicId number
   * @param typeId number
   */
  addSubTopicName(subtopicName: string, topicId: number, typeId: number) {
    return this.http.post<SubtopicName>(environment.subtopic.addSubTopicName(subtopicName, topicId, typeId), httpOptions).map(
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
    return this.http.post(environment.subtopic.removeSubtopic(subtopicId), httpOptions).map(
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
    return this.http.post(environment.subtopic.removeAllSubtopics(batchId), httpOptions);
  }

  /**
   * Checks whether the given batch has any subtopics in its calendar
   * Returns request object with status 200 if the batch contains subtopics, 204 otherwise
   * @param batchId
   * @author Charlie Harris | Batch: 1712-dec11-java-steve
   */
  isPopulated(batchId: number) {
    return this.http.get(environment.subtopic.isPopulated(batchId), httpOptions);
  }
}
