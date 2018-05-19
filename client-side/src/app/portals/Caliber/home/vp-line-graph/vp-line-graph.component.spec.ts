import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VpHomeLineGraphService } from '../../services/graph/vp-home-line-graph.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AlertsService } from '../../services/alerts.service';
import { ReportsService } from '../../services/reports.service';
import { ColorService } from '../../services/colors/color.service';
import { VpLineGraphComponent } from './vp-line-graph.component';
import { ReportingService } from '../../services/reporting.service';
import { EvaluationService } from '../../services/evaluation.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HydraBatchService } from '../../../../gambit-client/services/batch/hydra-batch.service';
import { NoteService } from '../../services/note.service';

import { Dependencies } from '../../caliber.test.module';
import { DebugElement } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { Address } from '../../entities/Address';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { BatchService } from '../../../Bam/services/batch.service';
import { AlertService } from '../../../../gambit-client/services/alerts/alerts.service';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';

xdescribe('VpLineGraphComponent', () => {
  let component: VpLineGraphComponent;
  let fixture: ComponentFixture<VpLineGraphComponent>;

  beforeEach(done => (async() => {
    // TestBed.configureTestingModule( Dependencies);

    TestBed.configureTestingModule({
      imports:
      [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientTestingModule,
        ChartsModule,
      ],
      declarations:
      [
        VpLineGraphComponent,
      ],
      providers:
      [
        HttpTestingController,
        VpHomeLineGraphService,
        ReportingService,
        ReportsService,
        NoteService,
        BatchService,
        AlertService,
        EvaluationService,
        NgbModal,
        VpHomeSelectorService,
        ColorService,
        AlertsService,
        HydraBatchService,
        UrlService,
      ],
    });
    await TestBed.compileComponents();
  })().then(done).catch(done.fail));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpLineGraphComponent ],
      imports: [
        ChartsModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        ColorService,
        VpHomeLineGraphService,
        VpHomeSelectorService,
        AlertsService,
        ReportsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
