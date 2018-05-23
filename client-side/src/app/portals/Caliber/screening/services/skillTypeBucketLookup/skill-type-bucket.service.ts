import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { SkillTypeBucketLookUp } from '../../entities/skillTypeBucketLookup';
import { SKILL_TYPE_BUCKET_LOOKUP } from '../../mock-data/mock-skillTypeBucketLookup';
import { UrlUtilService } from '../UrlUtil/url-util.service';

/*

*/


/**
* Used to move the data for buckets and their related weights.
* Overall score for the evaluation is a weighted average of the scores for each bucket.
*
* Last modified by the Avengers
*
* Modified from made endpoints more consistent with
* the rest of the application.
*
* Alex Pich | 1803-USF-MAR26 | Wezley Singleton
*
* Danny S Chhunn | 1803-USF-MAR26 | Wezley Singleton
*
* Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
*
* Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
*/
@Injectable()
export class SkillTypeBucketService {
  private ROOT_URL: string = this.urlUtilService.getBase() + 'skilltype-service/';
  constructor(private httpClient: HttpClient,
    private urlUtilService: UrlUtilService) { }

  bucketsByWeight: SkillTypeBucketLookUp;


  // getSkillTypeBuckets(skillTypeID: number): Observable<any>{
  //   this.httpClient.get<any>(this.ROOT_URL + `skillType/getSkillTypeBucketsWithWeights/${skillTypeID}`).subscribe(data => {
  //     console.log(data);
  //   })
  //   return of(SKILL_TYPE_BUCKET_LOOKUP);
  // }

  // Returns an observable array of buckets (categories) with assigned weights
  getSkillTypeBuckets(skillTypeID: number): Observable<any> {
    return this.httpClient.get<any>(this.ROOT_URL + `skillType/getSkillTypeBucketsWithWeights/${skillTypeID}`);
  }

/*
  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return of(SKILL_TYPE_BUCKET_LOOKUP);
  }
*/

}
