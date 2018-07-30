import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AlertsService} from './alerts.service';
import {AssessmentService} from './assessment.service';

xdescribe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        AssessmentService,
        AlertsService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([AssessmentService], (service: AssessmentService) => {
    expect(service).toBeTruthy();
  }));
});

