import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../entities/Question';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  /** https://hydra-question-service.cfapps.io/ **/
  url: string = "/question/";
  question: any = "empty";

  createNewQuestion(bucketId: number, question: Question){
      return this.http.post(this.url + "createQuestion", {bucketId: bucketId, text: question.text, answers: question.answers, tagIds: question.tagIds}, httpOptions);
  }

  updateQuestion(bucketId: number, question: Question){
    return this.http.post(this.url + "updateQuestion", {bucketId: bucketId, text: question.text, answers: question.answers, tagIds: question.tagIds}, httpOptions);
}

  deactivateQuestion(questionId: number){
      return this.http.put(this.url + "deactivateQuestion", questionId, httpOptions);
  }

  activateQuestion(questionId: number){
      return this.http.put(this.url + "activateQuestion", questionId, httpOptions);
  }

  getBucketQuestions(bucketId: number){
      return this.http.get(this.url + "bucketQuestions/" + bucketId);
  }

}
