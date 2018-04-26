import { TestBed, inject } from '@angular/core/testing';

import { SoftSkillsViolationService } from './soft-skills-violation.service';

describe('SoftSkillsViolationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftSkillsViolationService]
    });
  });

  it('should be created', inject([SoftSkillsViolationService], (service: SoftSkillsViolationService) => {
    expect(service).toBeTruthy();
  }));
});
