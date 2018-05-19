import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InterviewDetailsComponent } from './interview-details.component';
import { PanelSearchbarComponent } from '../panel-searchbar/panel-searchbar.component';
import { HydraBatchService } from '../../../../gambit-client/services/batch/hydra-batch.service';
import { PanelService } from '../../services/panel.service';
import { Panel } from '../../entities/Panel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePanelComponent } from '../create-panel/create-panel.component';
import { GeneralFeedbackComponent } from '../general-feedback/general-feedback.component';
import { TechnicalFeedbackComponent } from '../technical-feedback/technical-feedback.component';
import { PanelOverallFeedbackComponent } from '../overall-feedback/panel-overall-feedback.component';
import { TraineeService } from '../../services/trainee.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';
import { ApiService } from '../../util/api.service';
import { BatchService } from '../../services/batch.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { environment } from '../../../../../environments/environment.uat';
import { link } from 'fs';
// import { GeneralFeedbackComponent } from '../general-feedback/general-feedback.component';

describe('InterviewDetailsComponent', () => {
  const context = environment.trainee;

  let component: InterviewDetailsComponent;
  let fixture: ComponentFixture<InterviewDetailsComponent>;
  let injector: TestBed;
  let panelService: PanelService;
  let httpMock: HttpTestingController;
  let mockReq: TestRequest;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule,
      ],
      declarations: [
        InterviewDetailsComponent,
        PanelSearchbarComponent,
        CreatePanelComponent,
        GeneralFeedbackComponent,
        TechnicalFeedbackComponent,
        PanelOverallFeedbackComponent,
      ],
      providers: [
        PanelService,
        HydraBatchService,
        PanelSearchbarComponent,
        TraineeService,
        AlertsService,
        UrlService,
        ApiService,
        BatchService,
      ],
    }).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    injector = getTestBed();
    panelService = injector.get(panelService);
    httpMock = injector.get(HttpTestingController);

    mockReq = httpMock.expectOne(context.save());
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('constructor works, and instantiates an interview form', () => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    component.panelList = [ new Panel() ];
    const spy = spyOnProperty(component, 'panelRound', 'get');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.panelRound).toEqual(component.panelList.length + 1);
  });

  it('constructor works when passed-in panelService is null', () => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    component.panelList = null;
    const spy = spyOnProperty(component, 'panelRound', 'get');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.panelRound).toEqual(1);
  });

  ////////////////////////////////////////////////////////////////////
  // ensure that all fields in this form exist
  it('interviewDate field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['interviewDate']).toBeTruthy();
  });

  it('interviewTime field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['interviewTime']).toBeTruthy();
  });

  it('internet field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['internet']).toBeTruthy();
  });

  it('panelRound field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['panelRound']).toBeTruthy();
  });

  it('format field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['format']).toBeTruthy();
  });

  it('recordingConsent field (in interview details form) is valid.', () => {
    expect(component.interviewForm.controls['recordingConsent']).toBeTruthy();
  });

  ////////////////////////////////////////////////////////////////////
  /* ensure that panelRound, field, and recordingConsent are disabled */
  it('panelRound field should be disabled.', () => {
    expect(component.interviewForm.controls['panelRound']).toBeFalsy();
  });

  it('format field should be disabled.', () => {
    expect(component.interviewForm.controls['format']).toBeFalsy();
  });

  it('recordingConsent field should be disabled.', () => {
    expect(component.interviewForm.controls['recordingConsent']).toBeFalsy();
  });
});
