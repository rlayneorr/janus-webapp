import { TestBed, inject } from '@angular/core/testing';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';

import { QuestionService } from './question.service';

fdescribe('QuestionService', () => {
  beforeEach(inject([QuestionService, MockBackend], (q, mockBackend) => {
    TestBed.configureTestingModule({
      providers: [QuestionService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  }));

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
  /*it('should retrieve question(?)', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));*/
  /*it('should alter question(?)', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));*/
});
