import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VpHomeLineGraphService} from '../../services/graph/vp-home-line-graph.service';
import {VpHomeSelectorService} from '../../services/selector/vp-home-selector.service';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {AlertsService} from '../../services/alerts.service';
import {ReportsService} from '../../services/reports.service';
import {ColorService} from '../../services/colors/color.service';
import {VpLineGraphComponent} from './vp-line-graph.component';
import {ReportingService} from '../../services/reporting.service';
import {EvaluationService} from '../../services/evaluation.service';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GambitBatchService} from '../../../../caliber-client/services/batch/gambit-batch.service';
import {NoteService} from '../../services/note.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BatchService} from '../../../Bam/services/batch.service';
import {AlertService} from '../../../../caliber-client/services/alerts/alerts.service';
import {UrlService} from '../../../../caliber-client/services/urls/url.service';

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
        GambitBatchService,
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
