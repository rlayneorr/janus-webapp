import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dependencies } from '../../../../app.test.module';
import { VpBarGraphComponent } from './vp-bar-graph.component';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { ReportingService } from '../../services/reporting.service';
import { EvaluationService } from '../../services/evaluation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { HydraBatchService } from '../../../../hydra-client/services/batch/hydra-batch.service';
import { NoteService } from '../../services/note.service';
import { ReportsService } from '../../services/reports.service';

fdescribe('VpBarGraphComponent_otherTests', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;

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
  
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit works as expected', () => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;
    const spyOnAlertService = spyOn(alertService, 'error'); 

    component = new VpBarGraphComponent(
      vpHomeBarGraphService,
      reportingService,
      evaluationService,
      modalService,
      http,
      alertService,
      vpHomeSelectorService,
      batchService,
      noteService,
      reportsService,
    );

    fixture.detectChanges(); 

    expect(spyOnAlertService).toHaveBeenCalled(); 
  });

  it('ngOnInit should throw an alert if batchService is null', () => {   
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;

    const spyOnAlertService = spyOn(alertService, 'error');

    component = new VpBarGraphComponent(
      vpHomeBarGraphService,
      reportingService,
      evaluationService,
      modalService,
      http,
      alertService,
      vpHomeSelectorService,
      null,
      noteService,
      reportsService,
    );

    fixture.detectChanges();

    expect(spyOnAlertService).toHaveBeenCalled();
  });
});
