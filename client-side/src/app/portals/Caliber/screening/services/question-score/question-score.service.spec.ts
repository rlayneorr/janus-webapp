import { TestBed, inject } from '@angular/core/testing';

import { QuestionScoreService } from './question-score.service';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";
import {QuestionScore} from "../../entities/questionScore";




fdescribe('QuestionScoreService', () => {

  var array;
  var update_array;
  beforeEach(() => {

    array = [34, 'comment', 2, '9:30', 2];
    update_array = [34, 'update comment', 2, '9:30',2];


    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [QuestionScoreService, UrlService]
    });
  });

  it('should be created', inject([QuestionScoreService], (service: QuestionScoreService) => {
    expect(service).toBeTruthy();
  }));



});
