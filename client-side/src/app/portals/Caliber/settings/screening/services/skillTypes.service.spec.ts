import { TestBed, inject } from '@angular/core/testing';

import { SkillTypesService } from './skillTypes.service';

fdescribe('SkillTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillTypesService]
    });
  });

  it('should be created', inject([SkillTypesService], (service: SkillTypesService) => {
    expect(service).toBeTruthy();
  }));
});
