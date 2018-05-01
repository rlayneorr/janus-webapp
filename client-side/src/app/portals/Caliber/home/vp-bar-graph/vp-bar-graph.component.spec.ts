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

// fdescribe('#getAddresses', () => {
//   it('should return an Observable<Addresses[]>', () => {
//     const dummyAddresses = [
//       //    addressId: number; street: string; city: string; state: string; zipcode: string; company: string; active: boolean;
//       {addressId: 0, street: 'Maple Street', city: 'Kansas City', state: 'KS', zipcode: '75421', company: 'Bro Bros.', active: true},
//       {addressId: 1, street: 'Empire Street', city: 'New York', state: 'NY', zipcode: '12345', company: 'Venture Industries', active: true},
//       {addressId: 2, street: 'Bubba Street', city: 'N/A', state: 'WY', zipcode: '54321', company: 'Bubbas Taxidermy', active: true},
//     ];

//     vpHomeSelectorService.populateAddresses.getAddresses().subscribe()
//   })
// });

fdescribe('VpBarGraphComponent', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;
  let spy : any;
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
    http                  = debugElement.injector.get(HttpTestingController);
    alertService          = debugElement.injector.get(AlertsService);
    vpHomeSelectorService = debugElement.injector.get(VpHomeSelectorService);
    batchService          = debugElement.injector.get(HydraBatchService);
    noteService           = debugElement.injector.get(NoteService);
    reportsService        = debugElement.injector.get(ReportsService);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('', () =>{
    // create an array of ChartDataEntity objects
    const mockChartData = [
      { 

      },
    ];

    this.reportsService.fetchReportsStackedBarCurrentWeek().subscribe(() => {
      (reports) => {
        QCStatuses = mockChartData;
      }
    });

    const Observable1 = this.reportsService.fetchReportsStackedBarCurrentWeek();
    const Observable2 = this.batchService.fetchAll();
    this.mergedObservablesSubscription = Observable1.merge(Observable2).subscribe(
      (resp) => {
        if (resp.length > 0) {
          this.mergedObservableResults.push(resp); 
        }
      });
  })

  // it('should return an Observable<Addresses[]>', () => {
  //   const dummyAddresses = [
  //     //    addressId: number; street: string; city: string; state: string; zipcode: string; company: string; active: boolean;
  //     {addressId: 0, street: 'Maple Street', city: 'Kansas City', state: 'KS', zipcode: '75421', company: 'Bro Bros.', active: true},
  //     {addressId: 1, street: 'Empire Street', city: 'New York', state: 'NY', zipcode: '12345', company: 'Venture Industries', active: true},
  //     {addressId: 2, street: 'Bubba Street', city: 'N/A', state: 'WY', zipcode: '54321', company: 'Bubbas Taxidermy', active: true},
  //   ];
  //   vpHomeSelectorService.populateAddresses('1').su
  //   batchService.fetchAll().subscribe()
  // })

  it('should create bar graph component', () => {
    expect(component).toBeTruthy();
  });

  it('should populate addresses using vpHomeSelectorService', () => {
    let addressesInService : Array<any>;
    this.vpHomeSelectorService.populateAddresses(this.results);
    expect(addressesInService).toEqual(component.addresses);
  });
});
