import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { Dependencies } from '../../caliber.test.module';
import { VpBarGraphComponent } from './vp-bar-graph.component';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { ReportingService } from '../../services/reporting.service';
import { EvaluationService } from '../../services/evaluation.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { HydraBatchService } from '../../../../hydra-client/services/batch/hydra-batch.service';
import { NoteService } from '../../services/note.service';
import { ReportsService } from '../../services/reports.service';
import { AppModule } from '../../../../app.module';
import { CaliberNavComponent } from '../../../../nav/caliber-nav/caliber-nav.component';
import { NavModule } from '../../../../nav/nav.module';
import { RouterModule, Router} from '@angular/router';
import { JanusComponent } from '../../../../Janus/janus.component';
import { ErrorAlertComponent } from '../../../../hydra-client/ui/error-alert/error-alert.component';
import { NgModule, DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { routes } from '../../caliber.routes';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from '../../../../app.component';
import { LoginComponent } from '../../../../login/login.component';
import { DashboardComponent } from '../../../../dashboard/dashboard.component';
import { CaliberComponent } from '../../caliber.component';
import { HomeComponent } from '../home.component';
import { ManageComponent } from '../../manage/manage.component';
import { AssessComponent } from '../../assess/assess.component';
import { QualityComponent } from '../../quality/quality.component';
import { ReportsComponent } from '../../reports/reports.component';
import { PanelComponent } from '../../panel/panel/panel.component';
import { ScreeningComponent } from '../../screening/components/screening/screening.component';
import { CandidatesScreeningListComponent } from '../../screening/components/candidates-screening-list/candidates-screening-list.component';
import { QuestionsTableComponent } from '../../screening/components/questions-table/questions-table.component';
import { FinalReportComponent } from '../../screening/components/final-report/final-report.component';
import { IntroductionComponent } from '../../screening/components/introduction/introduction.component';
import { PassFailComponent } from '../../screening/components/pass-fail/pass-fail.component';
import { SettingsComponent } from '../../settings/settings.component';
import { SkillsComponent } from '../../settings/skills/skills.component';
import { LocationsComponent } from '../../settings/locations/locations.component';
import { TrainersComponent } from '../../settings/trainers/trainers.component';
import { TrainerProfilesComponent } from '../../settings/trainer-profile/trainer-profile.component';
import { ScreeningConfigComponent } from '../../settings/screening/screening.component';
import { BucketComponent } from '../../settings/screening/bucket/bucket.component';
import { SkillTypeBucketsComponent } from '../../settings/screening/skillType-buckets/skillType-buckets.component';
import { BarGraphModalComponent } from './bar-graph-modal/bargraphmodal.component';
import { BatchModalComponent } from '../../manage/batch/batch-modal.component';
import { SpringInterceptor } from '../../interceptors/spring.interceptor';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('VpBarGraphComponent', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;

  let debugElement: DebugElement;

  let vpHomeBarGraphService: VpHomeBarGraphService;
  let reportingService: ReportingService;
  let evaluationService: EvaluationService;
  let modalService: NgbModal;
  let http: HttpClient;
  let alertService: AlertsService;
  let vpHomeSelectorService: VpHomeSelectorService;
  let batchService: HydraBatchService;
  let noteService: NoteService;
  let reportsService: ReportsService;

  let httpMock : HttpTestingController;
  let injector : TestBed;

  let mergedObservableResults : Array<any>;
  let mergedObservablesSubscription : Subscription;
  let QCStatuses : any; // should be equal to "results" in the component
  let batchIDs : any; // should be equal to "allBatches" in the component

  beforeEach(done => (async() => {
    TestBed.configureTestingModule( Dependencies);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;
    
    debugElement = fixture.debugElement;

    vpHomeBarGraphService = debugElement.injector.get(VpHomeBarGraphService);
    reportingService      = debugElement.injector.get(ReportingService);
    evaluationService     = debugElement.injector.get(EvaluationService);
    modalService          = debugElement.injector.get(NgbModal);
    http                  = debugElement.injector.get(HttpClient);
    alertService          = debugElement.injector.get(AlertsService);
    vpHomeSelectorService = debugElement.injector.get(VpHomeSelectorService);
    batchService          = debugElement.injector.get(HydraBatchService);
    noteService           = debugElement.injector.get(NoteService);
    reportsService        = debugElement.injector.get(ReportsService);

    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should create bar graph component', () => {
    expect(component).toBeTruthy();
  });

  it('onClick should trigger reportingService.fetchTechnologiesForTheWeek', () => {
    let fetchTechnologiesSpy = spyOn(reportingService, 'fetchTechnologiesForTheWeek').and.callThrough();

    // trigger the chartClick event described in the html document (inside the 'canvas' tag)
    $('#canvas').trigger('chartClick');
  
    expect(fetchTechnologiesSpy).toHaveBeenCalled();   
  });

  it('onClick should trigger evaluationService.FetchAllQCTraineeNotes', () => {
    const spy = spyOn(evaluationService, 'FetchAllQCTraineeNotes').and.callThrough();

    // trigger the chartClick event described in the html document (inside the 'canvas' tag)
    $('#canvas').trigger('chartClick');
  
    expect(spy).toHaveBeenCalled();
  });

  it('onClick should trigger evaluationService.FetchAllQCBatchNotes', () => {
    const spy = spyOn(evaluationService, 'FetchAllQCBatchNotes').and.callThrough();

    // trigger the chartClick event described in the html document (inside the 'canvas' tag)
    $('#canvas').trigger('chartClick');
    
    expect(spy).toHaveBeenCalled();
  });

  it('findCities should change hasBarChartData to true', () => {
    component.findCities('bleh');
    expect(component.hasBarChartData).toEqual(true);

    // try findCities again, and pass in an actual string this time
    TestBed.resetTestEnvironment();
    component.findCities('');
    expect(component.selectedState).toEqual(false);
    expect(component.hasBarChartData).toEqual(true);
  });

  it('hasCity is valid', () => {
    TestBed.resetTestEnvironment();
    component.hasCity('bleh');
    expect(component.hasBarChartData).toEqual(false);
  });

  it('populateBatchStatuses does stuff', () => {
    TestBed.resetTestEnvironment();
    component.populateBatchStatuses();
    expect(component.hasBatchStatuses).toEqual(true);

    TestBed.resetTestEnvironment();
    component.results = ['thing', 'thing', 'just want array to be larger than size 1', 'I\'m a professional'];
    component.populateBatchStatuses();
    expect(component.hasBatchStatuses).toEqual(true);
  });


});
