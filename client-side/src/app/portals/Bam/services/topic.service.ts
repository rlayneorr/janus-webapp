import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TopicName } from '../models/topicname.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'}),
  observe: 'response' as 'response'
};

@Injectable()
export class TopicService {
  constructor(private http: HttpClient) { }

  /**
   * Adds a topic to the database.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @param name string
   */
  addTopicName(name: string) {
    return this.http.post<TopicName>(environment.topic.addTopicName(name), httpOptions).map(
      data => {
        return data;
      }
    );
  }
}
