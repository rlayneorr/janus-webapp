import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SkillTypeService } from '../skillType/skill-type.service';
import { ScheduleScreeningService } from './schedule-screening.service';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

/**
 * Setting up the testing environment for ScheduleScreeningService.
 **/
describe('ScheduleScreeningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ScheduleScreeningService, SkillTypeService, UrlService]
    });
  });

  it('should be created', inject([ScheduleScreeningService], (service: ScheduleScreeningService) => {
    expect(service).toBeTruthy();
  }));
});
