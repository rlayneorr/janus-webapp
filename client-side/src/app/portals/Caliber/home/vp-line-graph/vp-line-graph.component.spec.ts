import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http/';
import { FormsModule } from '@angular/forms';
import { VpHomeLineGraphService } from '../../services/graph/vp-home-line-graph.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertsService } from '../../services/alerts.service';
import { ReportsService } from '../../services/reports.service';
import { ColorService } from '../../services/colors/color.service';
import { VpLineGraphComponent } from './vp-line-graph.component';
import { ReportingService } from '../../services/reporting.service';
import { EvaluationService } from '../../services/evaluation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HydraBatchService } from '../../../../hydra-client/services/batch/hydra-batch.service';
import { NoteService } from '../../services/note.service';

import { Dependencies } from '../../caliber.test.module';
import { DebugElement } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { Address } from '../../entities/Address';
import { ADDRESSES } from '../../mock-data/mock-addresses';

describe('VpLineGraphComponent', () => {
  let component: VpLineGraphComponent;
  let fixture: ComponentFixture<VpLineGraphComponent>;

  let vpHomeLineGraphService: VpHomeLineGraphService;
  let reportingService: ReportingService;
  let evaluationService: EvaluationService;
  let modalService: NgbModal;
  let http: HttpClient;
  let alertService: AlertsService;
  let vpHomeSelectorService: VpHomeSelectorService;
  let batchService: HydraBatchService;
  let noteService: NoteService;
  let reportsService: ReportsService;

  let debugElement: DebugElement; 

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ VpLineGraphComponent ],
  //     imports: [
  //       ChartsModule,
  //       HttpClientModule,
  //       FormsModule
  //     ],
  //     providers: [
  //       ColorService,
  //       VpHomeLineGraphService,
  //       VpHomeSelectorService,
  //       AlertsService,
  //       ReportsService
  //     ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(VpLineGraphComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(done => (async() => {
    TestBed.configureTestingModule( Dependencies);
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpLineGraphComponent);
    component = fixture.componentInstance;
    
    debugElement = fixture.debugElement;

    vpHomeLineGraphService = debugElement.injector.get(VpHomeLineGraphService);
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

  it('should create', () => {
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

  it('findCities should change hasData to true', () => {
    TestBed.resetTestEnvironment();

    component.findCities('bleh');
    expect(component.hasData).toEqual(true);

    // try findCities again, and pass in an actual string this time
    TestBed.resetTestEnvironment();
    component.findCities('');
    expect(component.selectedState).toEqual(false);
    expect(component.hasData).toEqual(true);
  });

  it('hasCity works as expected', () => {
    //TestBed.resetTestEnvironment();
    TestBed.resetTestEnvironment();
    
    component.hasCity('bleh');
    expect(component.hasData).toBeFalsy();
    
    const spyOnFillChartData = spyOn(this.VpHomeLineGraphService, 'fillChartData');
    
    // make a copy of component.lineChartData (a ChartDataEntity)
    let chartDataBefore : ChartDataEntity;
    chartDataBefore = component.lineChartData; 
    component.cities.add(this.ADDRESSES[0]); 
    component.cities.add(this.ADDRESSES[1]); 
    component.cities.add(this.ADDRESSES[2]); 
    component.hasCity('bleh'); 
    expect(component.hasData).toBeTruthy();
    expect(spyOnFillChartData).toHaveBeenCalled();

    // see if lineChartData has changed
    expect(chartDataBefore).not.toEqual(component.lineChartData);
  });
});
