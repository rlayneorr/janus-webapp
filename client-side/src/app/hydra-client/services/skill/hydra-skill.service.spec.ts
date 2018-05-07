import { TestBed, inject } from '@angular/core/testing';

import { GambitSkillService } from './gambit-skill.service';

xdescribe('HydraSkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GambitSkillService]
    });
  });

  it('should be created', inject([GambitSkillService], (service: GambitSkillService) => {
    expect(service).toBeTruthy();
  }));
});
