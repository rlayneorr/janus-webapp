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

fdescribe('VpLineGraphComponent', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents(); 

    // TestBed.configureTestingModule({
    //   declarations: [
    //     VpBarGraphComponent
    //   ],
    //   providers: [
    //     VpHomeBarGraphService,
    //     ReportingService,
    //     EvaluationService,
    //     NgbModal,
    //     HttpClient,
    //     AlertsService,
    //     VpHomeSelectorService,
    //     HydraBatchService,
    //     NoteService,
    //     ReportsService,
    //   ],
    // })
    // .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    fixture.componentInstance = new VpBarGraphComponent(
      this.VpHomeBarGraphService,
      this.ReportingService,
      this.EvaluationService,
      this.NgbModal,
      this.HttpClient,
      this.AlertsService,
      this.VpHomeSelectorService,
      this.HydraBatchService,
      this.NoteService,
      this.ReportsService
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have same addresses as vpHomeSelectorService', () => {
    let addressesInService : Array<any>;
    this.vpHomeSelectorService.populateAddresses(this.results);
    expect(addressesInService).toEqual(component.addresses);
  });

  it('vpHomeSelectorService exists', () => {
    expect(this.vpHomeSelectorService).toBeTruthy();
  });
});
