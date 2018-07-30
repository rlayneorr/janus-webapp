import {Injectable} from '@angular/core';
import 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// Entities
// import { Tag } from '../../entities/tag';
// Services
//import { TagService } from '../../../services/tag/tag.service';
import {CandidateService} from '../candidate/candidate.service';
import {UrlService} from '../../../../caliber-client/services/urls/url.service';
// import { TagsAndSkill } from '../../wrappers/tagsAndSkill';
/*
Provides an observable of Questions through the getQuestions() method.
*/
@Injectable()
export class QuestionService {

  constructor(
    private httpClient: HttpClient,
    private candidateService: CandidateService,
    private urlService: UrlService
  ) {}

  headers = new HttpHeaders({
    'Content-type': 'application/json'
  });

  /**
       * Disabled because relationship between question and skill microservice relationship
       * needs to be reworked on the serverside
       */
  // Returns an observable array of questions, filtered by the selected tags and
  // candidate's skillTypeID
  // getQuestions(): Observable<Question[]> {
  //   const tagArray: number[] = [];
  //   for (const tag of this.tagService.getCheckedTags()){
  //     tagArray.push(tag.tagId);
  //   }
  //   const currSkillTypeID = this.simpleTraineeService.getSelectedCandidate().skillTypeID;
  //   // let currSkillTypeID = this.simpleTraineeService.getSelectedCandidate().skillTypeID;
  //   const tagsAndSkill: TagsAndSkill = { tagList : tagArray, skillTypeId : currSkillTypeID };
  //   return this.httpClient.post<Question[]>(
  //     this.urlService.question.filteredQuestions(),
  //     tagsAndSkill
  //   );
  // }
}
