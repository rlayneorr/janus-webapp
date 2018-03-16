import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
headers: new HttpHeaders({
        'Content-Type':  'application/json',
    })
};

@Injectable()
export class QuestionsService {

  constructor(private http: HttpClient) { }

  url: string = "/question/";

  createNewQuestion(question: Question){
      return this.http.post(this.url + "createQuestion", question, httpOptions);
  }

  deactivateQuestion(questionId: int){
      return this.http.put(this.url + "deactivateQuestion", questionId, httpOptions);
  }

  activateQuestion(questionId: int){
      return this.http.put(this.url + "activateQuestion", questionId, httpOptions);
  }

}
