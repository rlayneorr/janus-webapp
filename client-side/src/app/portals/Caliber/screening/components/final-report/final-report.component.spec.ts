import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReportComponent } from './final-report.component';
import { ScreeningService } from '../../services/screening/screening.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CandidateService } from '../../services/candidate/candidate.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';
import { SkillTypeBucketService } from '../../services/skillTypeBucketLookup/skill-type-bucket.service';
import { QuestionScoreService } from '../../services/question-score/question-score.service';
import { ScoresToBucketsUtil } from '../../util/scoresToBuckets.util';
import { AlertService } from '../../../../Bam/services/alert.service';
import { AlertsService } from '../../../services/alerts.service';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';

// Author: David Gustafson
// Can't test because of error: "Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https"

describe('FinalReportComponent', () => {
  let component: FinalReportComponent;
  let fixture: ComponentFixture<FinalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalReportComponent ],
      providers: [ ScreeningService, HttpClient, HttpHandler, CandidateService, SkillTypeService,
        SkillTypeBucketService, QuestionScoreService, ScoresToBucketsUtil, AlertsService, SoftSkillsViolationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
