import { TestBed, inject } from '@angular/core/testing';

import { ScheduleScreeningService } from './schedule-screening.service';

fdescribe('ScheduleScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleScreeningService]
    });
  });

  it('should be created', inject([ScheduleScreeningService], (service: ScheduleScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
