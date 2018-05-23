import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { SkillType } from '../../entities/skillType';
import { SKILLTYPES } from '../../mock-data/mock-skillTypes';
import { UrlUtilService } from '../UrlUtil/url-util.service';


/**
* Used to get the mock data to create mock candidates.
* Code exists in repository, but is being refactored in the Skill Type Bucket Service
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
export class SkillTypeService {
  private ROOT_URL: string = this.urlUtilService.getBase();
  private candidateSkillType: Observable<SkillType>;
  constructor(
    private httpClient: HttpClient,
    private urlUtilService: UrlUtilService,
  ) { }

  /*
  getSkillTypes(): Observable<SkillType[]> {
    return of(SKILLTYPES);
  }
  */

  /** Returns an observable array of all skill types */
  getSkillTypes(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.ROOT_URL + 'skilltype-service/skillType/getSkillTypes/');
  }

  // getSkillTypes(): Observable<SkillType[]> {
  //   return this.httpClient.get<SkillType[]>(this.ROOT_URL + "/all.json");
  // }
}
