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

@Component({
  selector: 'app-vp-bar-graph',
  templateUrl: './vp-bar-graph.component.html',
  styleUrls: ['./vp-bar-graph.component.css']
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

  @Input()
  public allbatches: any;


  constructor(private vhbgs: VpHomeBarGraphService,
    private vhss: VpHomeSelectorService,
    private rs: ReportingService,
    private modalService: NgbModal,
    private http: HttpClient,
    private vpHomeSelectorService: VpHomeSelectorService,
    private environmentService: EnvironmentService) { }

  ngOnInit() {
    this.hasBarChartData = false;
    this.selectedState = false;
    this.barChartData = this.vhbgs.getBarChartData();
    const url = this.environmentService.buildUrl('all/reports/batch/week/stacked-bar-current-week');
    console.log(url);
    this.http.get(url, { withCredentials: true })
      .subscribe(
      (resp) => {
        this.results = resp;
        this.results.sort();
        this.barChartData = this.vhbgs.fillChartData(this.results, this.barChartData, '', '');
        this.addresses = this.vpHomeSelectorService.populateAddresses(this.results);
        this.states = this.vpHomeSelectorService.populateStates(this.addresses);
        this.hasBarChartData = true;
        this.populateBatchStatuses();
      });
  }
  // gets the statuses of the batches as well as stores the batch id and week
  // into a seperate array used for the modal
  populateBatchStatuses() {
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
    this.barChartData = this.vhbgs.fillChartData(this.results, this.barChartData, this.selectedBarState, '');
    this.hasBarChartData = true;
  }
  // after a city is selected, update the graph to reflect the selected city
  hasCity(city) {
    if (this.cities.size > 1) {
      this.hasBarChartData = false;
      this.barChartData = this.vhbgs
        .fillChartData(this.results, this.barChartData, this.selectedBarState, this.selectedBarCity);
      this.hasBarChartData = true;
    }
  }
  onClick(event: any) {
    const chartInfo = this.modalInfoArray[event.active[0]._index];
    let tech: Array<String>;

    const modalRef = this.modalService.open(BarGraphModalComponent);

    this.rs.fetchTechnologiesForTheWeek(chartInfo.id, chartInfo.week);
    this.techSub = this.rs.technologiesForTheWeek$.subscribe((result) => {
      if (result) {
        tech = result.data;
        modalRef.componentInstance.tech = tech;
      }
    });
  }

}
