import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../../entities/Question';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  // Test URL for mock data.
  // url: string="/question/"
  url = 'https://hydra-gateway-service.cfapps.io/question-service/question/';
  questions: Question[];

  /**
   * Alex Pich | 1803-USF-MAR26 | Wezley Singleton
   *
   * Danny S Chhunn | 1803-USF-MAR26 | Wezley Singleton
   *
   * Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
   *
   * Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
   */
  createNewQuestion(question: Question, tagIds: number[]) {
    return this.http.post(this.url + 'createQuestion', { question: question, tagIds: tagIds }, httpOptions);
  }

  updateQuestion(question: Question, newTagIds: number[]) {
    return this.http.post(this.url + 'updateQuestion', { question: question, tagIds: newTagIds }, httpOptions);
  }

  deactivateQuestion(questionId: number) {
    return this.http.put(this.url + 'deactivateQuestion/' + questionId, httpOptions);
  }

  activateQuestion(questionId: number) {
    return this.http.put(this.url + 'activateQuestion/' + questionId, httpOptions);
  }

  getBucketQuestions(bucketId: number) {
    return this.http.get(this.url + 'bucketQuestions/' + bucketId);
  }
}
