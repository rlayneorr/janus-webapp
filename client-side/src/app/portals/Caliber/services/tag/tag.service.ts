import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Tag } from '../../screening/entities/tag';
import { TAGS } from '../../screening/mock-data/mock-tags';
import { UrlUtilService } from '../../screening/services/UrlUtil/url-util.service';
// C:\Users\clay5\Project 3\janus-webapp\client-side\src\app\portals\Caliber\screening\services\UrlUtil\url-util.service.ts

/*
Used to get the Tags that are shown to the screener
in the first phase of the interview.

The screener will be presented with the list of all tags in the system,
select one or more tags, and then the tags
are sent to the server to generate the question buckets.

Tag is a very ephemeral entity, used for only a brief time
*/
@Injectable()
export class TagService {

  constructor(private http: HttpClient,
    private urlUtilService: UrlUtilService) { }

  private ROOT_URL: string = this.urlUtilService.getBase();

  public tagListChecked: Tag[] = [];



  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(
      this.urlUtilService.getBase() + '/question-service/tag/getAllTags', {}
    );
  }
  // Fake local data for temp use
  /*getAllTags(): Observable<Tag[]>{
    return of(TAGS);
  }*/

  getCheckedTags(): Tag[] {
    return this.tagListChecked;
  }
}
