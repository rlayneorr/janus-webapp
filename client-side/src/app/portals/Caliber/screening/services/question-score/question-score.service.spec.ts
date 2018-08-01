import { TestBed, inject, async } from '@angular/core/testing';

import { QuestionScoreService } from './question-score.service';
import {HttpClientModule, HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";

fdescribe('QuestionScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [QuestionScoreService, UrlService]
    });
  });

  it('should be created', inject([QuestionScoreService], (service: QuestionScoreService) => {
    expect(service).toBeTruthy();
  }));
});
