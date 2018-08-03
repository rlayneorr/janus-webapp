import {inject, TestBed} from '@angular/core/testing';

import {ScreeningService} from './screening.service';

fdescribe('ScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreeningService]
    });
  });

  it('should be created', inject([ScreeningService], (service: ScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
