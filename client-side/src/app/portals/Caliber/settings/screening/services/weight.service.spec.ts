import { TestBed, inject } from '@angular/core/testing';

import { CategoryWeightsService } from './weight.service';

describe('CategoryWeightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryWeightsService]
    });
  });

  it('should be created', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
    expect(service).toBeTruthy();
  }));
});
