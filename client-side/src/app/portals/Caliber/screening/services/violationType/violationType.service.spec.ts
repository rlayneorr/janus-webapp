import { TestBed, inject } from '@angular/core/testing';

import { ViolationTypeService } from './violationType.service';

fdescribe('ViolationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViolationTypeService]
    });
  });

  it('should be created', inject([ViolationTypeService], (service: ViolationTypeService) => {
    expect(service).toBeTruthy();
  }));
});
