import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Dependencies } from '../../../caliber.test.module';
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
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

// Author: David Gustafson
// Author: Neil Ferman
/**
 * Presently any tests run for this component are causing Karma to halt.
 */
fdescribe('FinalReportComponent', () => {
  let component: FinalReportComponent;
  let fixture: ComponentFixture<FinalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalReportComponent ],
      providers: [ HttpClient, HttpHandler, ScreeningService, CandidateService, SkillTypeService,
        SkillTypeBucketService, QuestionScoreService, ScoresToBucketsUtil, AlertsService,
        SoftSkillsViolationService, UrlService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Tests whether or not the component is created.
   */
  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  /**
   * Test if it copied to clipboard successfully.
   *
   * Function tested: copyToClipboard();
   **/
  /*it('should save successfully',
  inject([AlertsService], (service: AlertsService) => {
    component.copyToClipboard();
    let msg = '';
    let ty = '';
    service.getMessage().subscribe((s) => {
      ty = s.type;
      msg = s.text;
      expect(ty).toEqual('success');
      expect(msg).toEqual('Copied to Clipboard');
    });
  }));*/

});
