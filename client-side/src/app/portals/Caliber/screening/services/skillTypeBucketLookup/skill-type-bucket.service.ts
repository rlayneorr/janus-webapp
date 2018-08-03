import { Injectable } from '@angular/core';
import 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SkillTypeBucketLookUp } from '../../entities/skillTypeBucketLookup';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

/*

*/


/**
* Used to move the data for buckets and their related weights.
* Overall score for the evaluation is a weighted average of the scores for each bucket.
*
* Modified from made endpoints more consistent with
* the rest of the application.
*
* @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
*
* @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
*
* @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
*
* @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
*/
@Injectable()
export class SkillTypeBucketService {
  constructor(
    private httpClient: HttpClient,
    private urlService: UrlService
  ) { }

  bucketsByWeight: SkillTypeBucketLookUp;


  // getSkillTypeBuckets(skillTypeID: number): Observable<any>{
  //   this.httpClient.get<any>(this.ROOT_URL + `skillType/getSkillTypeBucketsWithWeights/${skillTypeID}`).subscribe(data => {
  //     console.log(data);
  //   })
  //   return of(SKILL_TYPE_BUCKET_LOOKUP);
  // }

  // Returns an observable array of buckets (categories) with assigned weights
  // getSkillTypeBuckets(skillTypeID: number): Observable<any> {
  //   return this.httpClient.get<any>(`${this.urlService.skillTypes.getBucketBySkillType(skillTypeID)}`);
  // }

/*
  getSkillTypeBuckets(skillTypeID: number): Observable<SkillTypeBucketLookUp>{
    return of(SKILL_TYPE_BUCKET_LOOKUP);
  }
*/

}
