import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

fdescribe('VpBarGraphComponent', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;
  let spy : any;
  let de: DebugElement;

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

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule(Dependencies).compileComponents(); 
  // }));

  beforeEach(done => (async() => {
    // TestBed.configureTestingModule(
    //   {
    //     imports: [
    //       CommonModule,
    //       BrowserModule,
    //       HttpModule,
    //       NgbModule.forRoot(),
    //       FormsModule,
    //       NavModule,
    //       RouterModule.forRoot(routes, { useHash: true }),
    //       ChartsModule,
    //       HttpClientModule,
    //       RouterModule.forChild(routes),
    //     ],
    //     declarations: [
    //       VpBarGraphComponent,
    //       AppComponent,
    //       LoginComponent,
    //       DashboardComponent,
    //       JanusComponent,
    //       ErrorAlertComponent,
    //       CaliberComponent,
    //       HomeComponent,
    //       ManageComponent,
    //       AssessComponent,
    //       QualityComponent,
    //       ReportsComponent,
    //       PanelComponent,
    //       ScreeningComponent,
    //       CandidatesScreeningListComponent,
    //       QuestionsTableComponent,
    //       FinalReportComponent,
    //       IntroductionComponent,
    //       PassFailComponent,
    //       SettingsComponent,
    //       SkillsComponent,
    //       LocationsComponent,
    //       TrainersComponent,
    //       TrainerProfilesComponent,
    //       ScreeningConfigComponent,
    //       BucketComponent,
    //       SkillTypeBucketsComponent,
    //       ErrorAlertComponent,
    //       BarGraphModalComponent,
    //       BatchModalComponent,
    //     ],
    //     providers: [
    //       { provide: HTTP_INTERCEPTORS, useClass: SpringInterceptor, multi: true },  // interceptor for all HTTP requests
    //       UrlService,
    //       {provide: Router, useValue: {}}
    //     ],
    //   }
    // ).compileComponents();
    
    TestBed.configureTestingModule( Dependencies);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;
    
    de = fixture.debugElement;

    vpHomeBarGraphService = de.injector.get(VpHomeBarGraphService);
    reportingService      = de.injector.get(ReportingService);
    evaluationService     = de.injector.get(EvaluationService);
    modalService          = de.injector.get(NgbModal);
    http                  = de.injector.get(HttpClient);
    alertService          = de.injector.get(AlertsService);
    vpHomeSelectorService = de.injector.get(VpHomeSelectorService);
    batchService          = de.injector.get(HydraBatchService);
    noteService           = de.injector.get(NoteService);
    reportsService        = de.injector.get(ReportsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('ErrorAlertComponent (a dependency of vp-bar-graph) was created successfully', () => {
  //   expect(ErrorAlertComponent.)
  // });
  // it('should have same addresses as vpHomeSelectorService', () => {
  //   let addressesInService : Array<any>;
  //   this.vpHomeSelectorService.populateAddresses(this.results);
  //   expect(addressesInService).toEqual(component.addresses);
  // });

  // it('vpHomeSelectorService exists', () => {
  //   expect(this.vpHomeSelectorService).toBeTruthy();
  // });
});
