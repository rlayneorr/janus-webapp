import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassFailComponent } from './pass-fail.component';
import { ViolationFlagComponent } from '../violation-flag/violation-flag.component';
import { SoftSkillsViolationService } from '../../services/soft-skills-violation/soft-skills-violation.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ScreeningService } from '../../services/screening/screening.service';
import { CandidateService } from '../../services/candidate/candidate.service';
import { SkillTypeService } from '../../services/skillType/skill-type.service';
import { ViolationTypeService } from '../../services/violationType/violationType.service';
import { AlertsService } from '../../../services/alerts.service';

// Author: David Gustafson

// Cannot test: Appears to be error on component side

describe('PassFailComponent', () => {
  let component: PassFailComponent;
  let fixture: ComponentFixture<PassFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassFailComponent, ViolationFlagComponent ],
      providers: [ SoftSkillsViolationService, HttpClient, HttpHandler, ScreeningService, CandidateService,
      SkillTypeService, ViolationTypeService, AlertsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
