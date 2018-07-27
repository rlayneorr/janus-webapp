import { TestBed, inject } from '@angular/core/testing';

import { SkillTypeBucketService } from './skill-type-bucket.service';

fdescribe('SkillTypeBucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillTypeBucketService]
    });
  });

  it('should be created', inject([SkillTypeBucketService], (service: SkillTypeBucketService) => {
    expect(service).toBeTruthy();
  }));
});
