import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../../entities/Question';
import { UrlUtilService } from '../../../Caliber/screening/services/UrlUtil/url-util.service';
import { environment } from '../../../../../environments/environment';

/**
  * unified create and update question so that it sends the
  * same objects
  *
  * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Danny S Chhunn | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
  */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  /**
   * refactored to not depend on urlUtil Service
   */
  private readonly questionEndPoint: string = environment.gambitContext + 'question-service/question/';
  questions: Question[];

  /**
   * Modifed parameters to only take in question and tagIds and not also bucket id because that is already
   * stored in question
   * updated to be in sync with new Gambit question service modifications
   * @param question - question model
   * @param tagIds - array of tag ids
   */
  createNewQuestion(question: Question, tagIds: number[]) {
    return this.http.post(this.questionEndPoint + 'createQuestion', { question: question, tagIds: tagIds }, httpOptions);
  }

  /**
   * Removed dead code
   * Removed buckedId parameter
   * updated to be in sync with new Gambit question service modifications
   * @param question
   * @param newTagIds
   */
  updateQuestion(question: Question, newTagIds: number[]) {
    return this.http.post(this.questionEndPoint + 'updateQuestion', { question: question, tagIds: newTagIds }, httpOptions);
  }

  /**
   * deactivates question
   * @param questionId
  */
  deactivateQuestion(questionId: number) {
    return this.http.put(this.questionEndPoint + 'deactivateQuestion/' + questionId, httpOptions);
  }

  /**
   * activates question
   * @param questionId
  */
  activateQuestion(questionId: number) {
    return this.http.put(this.questionEndPoint + 'activateQuestion/' + questionId, httpOptions);
  }

  /**
   * gets all questions from bucket
   * @param buckerId
  */
  getBucketQuestions(bucketId: number) {
    return this.http.get(this.questionEndPoint + 'bucketQuestions/' + bucketId);
  }
}
