import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../entities/Question';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

/**
  * Used url Service to input endpoints to our services
  * unified create and update question so that it sends the
  * same objects
  */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  questions: Question[];

  /**
   * Modifed parameters to only take in question and tagIds and not also bucket id because that is already
   * stored in question
   * updated to be in sync with new Gambit question service modifications
   * used urlService to get endpoint for posting new questions
   * @param question - question model
   */
  createNewQuestion(question: Question) {
    return this.http.post(this.urlService.question.postQuestion(), { question: question }, httpOptions);
  }

  /**
   * Removed dead code
   * Removed buckedId parameter
   * updated to be in sync with new Gambit question service modifications
   * used urlService to get endpoint for updating new quetions with put method
   * @param question
   */
  updateQuestion(question: Question) {
    return this.http.put(this.urlService.question.putQuestion(), { question: question }, httpOptions);
  }

  /**
   * deactivates question
   * add urlService to get endpoint for deactivating a question
   * @param questionId
  */
  deactivateQuestion(questionId: number) {
    return this.http.put(this.urlService.question.deactivateQuestion(questionId), httpOptions);
  }

  /**
   * activates question
   * add urlService to get endpoint for activating a question
   * @param questionId
  */
  activateQuestion(questionId: number) {
    return this.http.put(this.urlService.question.activateQuestion(questionId), httpOptions);
  }

  /**
   * gets all questions from bucket
   * add urlService to get endpoint for getting Bucket Questions
   * @param bucketId
  */
  getBucketQuestions(bucketId: number) {
    return this.http.get(this.urlService.question.getQuestionsByBucketId(bucketId));
  }
}
