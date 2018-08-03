import {inject, TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TrainingTypeService} from './training-type.service';

xdescribe('TrainingTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TrainingTypeService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([TrainingTypeService], (service: TrainingTypeService) => {
    expect(service).toBeTruthy();
  }));
});
