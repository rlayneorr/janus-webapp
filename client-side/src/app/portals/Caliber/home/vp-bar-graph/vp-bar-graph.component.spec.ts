import { async, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';

// services
import { VpBarGraphComponent } from './vp-bar-graph.component';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { ReportingService } from '../../services/reporting.service';
import { NoteService } from '../../services/note.service';
import { BatchService } from '../../services/batch.service';
import { AlertService } from '../../../Bam/services/alert.service';
import { EvaluationService } from '../../services/evaluation.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts';
import { ColorService } from '../../services/colors/color.service';
import { AlertsService } from '../../services/alerts.service';
import { HydraBatchService } from '../../../../hydra-client/services/batch/hydra-batch.service';
import { UrlService } from '../../../../hydra-client/services/urls/url.service';
import { ReportsService } from '../../services/reports.service';

// entities
import { DataSet } from '../../entities/DataSet';
import { ChartDataEntity } from '../../entities/ChartDataEntity';

// other
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { appendFile } from 'fs';

fdescribe('VpBarGraphComponent', () => {
  let component: VpBarGraphComponent;
  let fixture: ComponentFixture<VpBarGraphComponent>;

  beforeEach(done => (async() => {
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
        VpBarGraphComponent,
      ],
      providers:
      [
        HttpTestingController,
        VpHomeBarGraphService,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(VpBarGraphComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create bar graph component', () => {
    expect(component).toBeTruthy();
  });

  it('expect populateBatchStatuses() to fetch all batches',
    inject([HttpTestingController, NoteService],
    (httpMock: HttpTestingController, service: NoteService) => {

      // Call the service
      service.fetchQcBatchNotesByBatchIdByWeek(1, 2).subscribe(data => {
      });
      component.results = 'Pass';
      component.populateBatchStatuses();

      // Set expectations for the HttpClient mock
      const req = httpMock.expectOne('http://localhost:8765/batches');
      expect(req.request.method).toEqual('GET');

      // Set the fake data to be returned by the mock
      req.flush({data:
        JSON.parse(`
        [
          {'batchId':1,'resourceId':1,'trainingName':'Open-architected','trainer':1,
          'cotrainer':1,'skillType':null,'trainingType':'regional','addressId':1,
          'location':'Saint Paul','goodGradeThreshold':80,'borderlineGradeThreshold':72,
          'startDate':'2017-05-20 18:09:03','endDate':'2017-03-26 07:29:28','week':1,'noteIds':null,'trainees':null},
          {'batchId':2,'resourceId':2,'trainingName':'hybrid','trainer':2,'cotrainer':2,
          'skillType':null,'trainingType':'global','addressId':2,'location':'Moulton',
          'goodGradeThreshold':80,'borderlineGradeThreshold':72,'startDate':'2017-01-10 11:25:59',
          'endDate':'2017-03-27 18:51:25','week':2,'noteIds':null,'trainees':null},
          {'batchId':3,'resourceId':3,'trainingName':'asymmetric','trainer':3,'cotrainer':8,
          'skillType':null,'trainingType':'client-server','addressId':3,'location':'Carpenter',
          'goodGradeThreshold':80,'borderlineGradeThreshold':72,'startDate':'2017-09-12 08:15:04',
          'endDate':'2017-11-02 02:09:34','week':3,'noteIds':null,'trainees':null},
          {'batchId':4,'resourceId':4,'trainingName':'product','trainer':4,'cotrainer':7,
          'skillType':null,'trainingType':'bandwidth-monitored','addressId':4,'location':
          'Blackbird','goodGradeThreshold':80,'borderlineGradeThreshold':72,'startDate':
          '2018-01-19 20:12:02','endDate':'2017-12-18 22:28:14','week':4,'noteIds':null,'trainees':null}
        ]`)
      });
    })
  );
});
