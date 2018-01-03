import { Component, OnInit } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { HttpClient } from '@angular/common/http';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core';
import { BarGraphModalComponent } from './bar-graph-modal/bargraphmodal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReportingService } from '../../../services/reporting.service';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import { EnvironmentService } from '../../services/environment.service';
import { EvaluationService } from '../../services/evaluation.service';
import { Note } from '../../entities/Note';
import { DataSet } from '../../entities/DataSet';

@Component({
  selector: 'app-vp-bar-graph',
  templateUrl: './vp-bar-graph.component.html',
  styleUrls: ['./vp-bar-graph.component.css', '../homeCSS/vpHomeCharts.css']
})
export class VpBarGraphComponent implements OnInit {
  public barChartData: ChartDataEntity;
  public results: any;
  public addresses;
  public states: any;
  public cities: any;
  public hasBarChartData: boolean;
  public selectedBarCity = '';
  public selectedBarState = '';
  public selectedState: boolean;
  public overallBatchStatusArray = [];
  public modalInfoArray: [{
    id: number;
    week: number;
  }];
  public modal: BarGraphModalComponent;
  public techSub: Subscription;
  public QCSub: Subscription;
  public batchSub: Subscription;

  @Input()
  public allbatches: any;
  public hasBatchStatuses = false;


  constructor(private vpHomeBarGraphService: VpHomeBarGraphService,
    private vhss: VpHomeSelectorService,
    private rs: ReportingService,
    private es: EvaluationService,
    private modalService: NgbModal,
    private http: HttpClient,
    private vpHomeSelectorService: VpHomeSelectorService,
    private environmentService: EnvironmentService) { }

  ngOnInit() {
    this.hasBarChartData = false;
    this.selectedState = false;
    this.barChartData = this.vpHomeBarGraphService.getBarChartData();
    const url = this.environmentService.buildUrl('all/reports/batch/week/stacked-bar-current-week');
    console.log(url);
    this.http.get(url, { withCredentials: true })
      .subscribe(
      (resp) => {
        this.results = resp;
        this.results.sort();
        console.log(resp);
        // this.results.push( {
        //   address: {},
        //   qcStatus: {
        //     Poor: 8,
        //     Superstar: 18,
        //     Good: 1,
        //     Average: 2,
        //   },
        //   id: 2201,
        //   label: 'Boe Jackson',
        // });
        // this.results.push( {
        //   address: {},
        //   qcStatus: {
        //     Poor: 8,
        //     Superstar: 18,
        //     Good: 1,
        //     Average: 2,
        //   },
        //   id: 2201,
        //   label: 'Joe Jackson',
        // });
        // this.results.push( {
        //   address: {},
        //   qcStatus: {
        //     Poor: 8,
        //     Superstar: 18,
        //     Good: 1,
        //     Average: 3,
        //   },
        //   id: 2201,
        //   label: 'Moe Jackson',
        // });
        // this.results.push( {
        //   address: {},
        //   qcStatus: {
        //     Poor: 19,
        //     Superstar: 0,
        //     Good: 0,
        //     Average: 12,
        //   },
        //   id: 2201,
        //   label: 'Toe Jackson',
        // });
        this.barChartData = this.vpHomeBarGraphService.fillChartData(this.results, this.barChartData, '', '');
        console.log(this.barChartData);
        this.addresses = this.vpHomeSelectorService.populateAddresses(this.results);
        this.states = this.vpHomeSelectorService.populateStates(this.addresses);
        this.hasBarChartData = true;
        this.http.get(this.environmentService.buildUrl('/qc/batch/all')).subscribe(
          (resp2) => {
             this.allbatches = resp2;
             this.populateBatchStatuses();
         });

      });
  }
  // gets the statuses of the batches as well as stores the batch id and week
  // into a seperate array used for the modal
  populateBatchStatuses() {
    this.hasBatchStatuses = false;
    this.overallBatchStatusArray = [];
    this.modalInfoArray = undefined;
    for (const result of this.results) {
      const batch = this.allbatches.filter(i => i.batchId === result.id)[0];
      if (this.modalInfoArray === undefined) {
        this.modalInfoArray = [{ 'id': <number>batch.batchId, 'week': <number>batch.weeks }];
      } else {
        this.modalInfoArray.push({ 'id': <number>batch.batchId, 'week': <number>batch.weeks });
      }
      this.http.get(this.environmentService.buildUrl(`qc/note/batch/${batch.batchId}/${batch.weeks}/`))
        .subscribe((resp) => {
          const temp: any = resp;
          this.overallBatchStatusArray.push(temp.qcStatus);
        });
    }
    this.hasBatchStatuses = true;
  }
  // called when a state is selected to get cities for the cities drop down
  // as well as re-populate the chartData
  findCities(state) {
    this.hasBarChartData = false;
    this.selectedBarCity = '';
    if (state === '') {
      this.selectedState = false;
    } else {
      this.selectedState = true;
      this.cities = this.vpHomeSelectorService.populateCities(this.selectedBarState, this.addresses);
    }
    this.barChartData = this.vpHomeBarGraphService.fillChartData(this.results, this.barChartData, this.selectedBarState, '');
    this.hasBarChartData = true;
  }
  // after a city is selected, update the graph to reflect the selected city
  hasCity(city) {
    if (this.cities.size > 1) {
      this.hasBarChartData = false;
      this.barChartData = this.vpHomeBarGraphService
        .fillChartData(this.results, this.barChartData, this.selectedBarState, this.selectedBarCity);
      this.hasBarChartData = true;
    }
  }

  // when you click on a bar graph, show detailed information
  onClick(event: any) {
    const chartInfo = this.modalInfoArray[event.active[0]._index];
    let tech: Array<String>;
    let trainees: Array<Note>;
    let batchNotes: Note;

    // open the Modal
    const modalRef = this.modalService.open(BarGraphModalComponent);

    // populate Technoloiges
    this.rs.fetchTechnologiesForTheWeek(chartInfo.id, chartInfo.week);
    this.techSub = this.rs.technologiesForTheWeek$.subscribe((result) => {
      if (result) {
        tech = result.data;
        modalRef.componentInstance.tech = tech;
      }
    });

    // populate detailed trainee notes
    this.es.FetchAllQCTraineeNotes(chartInfo.id, chartInfo.week);
    this.QCSub = this.es.allQCTraineeNotes$.subscribe((result) => {
      if (result) {
        trainees = result.data;

        // Styling
        trainees.forEach(item => {
          if (!item.content) {
            item.content = '-';
          }
        });

        modalRef.componentInstance.trainees = trainees;
      }
    });

    // populate qc overal information
    this.es.FetchAllQCBatchNotes(chartInfo.id, chartInfo.week);
    this.batchSub = this.es.allQCBatchNotes$.subscribe((result) => {
      if (result) {
        batchNotes = result.data;
        modalRef.componentInstance.batchNotes = batchNotes;
      }
    });
  }

  getDataPoints(j) {
    return this.barChartData.data.filter(i => i.stack === j + 1);
  }

}
