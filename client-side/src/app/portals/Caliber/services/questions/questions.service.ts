import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../../entities/Question';
import {UrlService} from '../../../../caliber-client/services/urls/url.service';

/**
  * Used url Service to input endpoints to our services
  * unified create and update question so that it sends the
  * same objects
  *
  * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
  *
  * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
  */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient, private urlService: UrlService) { }

  questions: Question[];

  /**
   * Modifed parameters to only take in question and tagIds and not also bucket id because that is already
   * stored in question
   * updated to be in sync with new Gambit question service modifications
   * used urlService to get endpoint for posting new questions
   * @param question - question model
   *
   */

   // pulled tags out every location now have 500 error
  createNewQuestion(question: Question) {
    return this.http.post(this.urlService.question.postQuestion(), { question: question }, httpOptions);
  }

  /**
   * Removed dead code
   * Removed buckedId parameterz
   * updated to be in sync with new Gambit question service modifications
   * used urlService to get endpoint for updating new quetions with put method
   * @param question
   *
   */
  updateQuestion(question: Question) {
    return this.http.put(this.urlService.question.putQuestion(question.questionId), question, httpOptions);
  }
   /**
   * deactivates question
   * add urlService to get endpoint for deactivating a question
   * @param questionId
  */
  deleteQuestion(questionId: number) {
    return this.http.delete(this.urlService.question.deleteQuestion(questionId), httpOptions);
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
