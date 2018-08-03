import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TopicName } from '../models/topicname.model';
import { UrlService } from '../../../caliber-client/services/urls/url.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'}),
  observe: 'response' as 'response'
};

@Injectable()
export class TopicService {
  constructor(private http: HttpClient, private urlService: UrlService) { }

  /**
   * Adds a topic to the database.
   * @author Cristian Hermida | Batch: 1712-dec10-java-steve
   * @param name string
   */
  addTopicName(name: string) {
    return this.http.post<TopicName>(this.urlService.topic.addTopicName(name), httpOptions).map(
      data => {
        return data;
      }
    );
  }
}
