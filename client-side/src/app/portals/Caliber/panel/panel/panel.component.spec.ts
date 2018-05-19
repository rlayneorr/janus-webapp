import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';
import { PanelTableComponent } from '../panel-table/panel-table.component';
import { CreatePanelComponent } from '../create-panel/create-panel.component';
import { FeedbackIconComponent } from '../../quality/feedback-icon/feedback-icon.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverallFeedbackComponent } from '../../reports/overall-feedback/overall-feedback.component';
import { InterviewDetailsComponent } from '../interview-details/interview-details.component';
import { GeneralFeedbackComponent } from '../general-feedback/general-feedback.component';
import { TechnicalFeedbackComponent } from '../technical-feedback/technical-feedback.component';
import { SkillsComponent } from '../../settings/skills/skills.component';
import { PanelOverallFeedbackComponent } from '../overall-feedback/panel-overall-feedback.component';
import { ArrToStringPipe } from '../../pipes/arr-to-string.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from '../../alerts/alerts.component';
import { ErrorAlertComponent } from '../../../../gambit-client/ui/error-alert/error-alert.component';
import { AlertsService } from '../../services/alerts.service';
import { NotificationsService } from 'angular2-notifications-lite';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HydraBatchService } from '../../../../gambit-client/services/batch/hydra-batch.service';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';
import { PanelService } from '../../services/panel.service';
import { ApiService } from '../../util/api.service';
import { Dependencies } from '../../caliber.test.module';
import { CaliberComponent } from '../../caliber.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
      ],
      declarations: [
        PanelComponent,
        PanelSearchbarComponent,
        PanelTableComponent,
        CreatePanelComponent,
        FeedbackIconComponent,
        OverallFeedbackComponent,
        InterviewDetailsComponent,
        GeneralFeedbackComponent,
        TechnicalFeedbackComponent,
        SkillsComponent,
        PanelOverallFeedbackComponent,
        ArrToStringPipe,
        AlertsComponent,
        ErrorAlertComponent,
        CaliberComponent,
      ],
      providers: [
        NotificationsService,
        AlertsService,
        TraineeService,
        HttpClient,
        HttpHandler,
        HydraBatchService,
        UrlService,
        PanelService,
        ApiService,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
