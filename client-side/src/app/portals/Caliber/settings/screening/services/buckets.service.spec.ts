import { TestBed, inject } from '@angular/core/testing';

import { BucketsService } from './buckets.service';

fdescribe('BucketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketsService]
    });
  });

  it('should be created', inject([BucketsService], (service: BucketsService) => {
    expect(service).toBeTruthy();
  }));
});
