import { Component, OnInit } from '@angular/core';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { VpHomeBarGraphService } from '../../services/graph/vp-home-bar-graph.service';
import { Http } from '@angular/http';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Input } from '@angular/core';

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
  @Input()
  public allbatches: any;


  constructor(private vhbgs: VpHomeBarGraphService,
    private http: Http,
    private vhss: VpHomeSelectorService) { }

  ngOnInit() {
    this.hasBarChartData = false;
    this.selectedState = false;
    this.barChartData = this.vhbgs.getBarChartData();
    this.http.get('http://localhost:8080/all/reports/batch/week/stacked-bar-current-week', { withCredentials: true })
      .subscribe(
      (resp) => {
        this.results = resp.json();
        this.results.sort();
        this.barChartData = this.vhbgs.fillChartData(this.results, this.barChartData, '', '');
        this.addresses = this.vhss.populateAddresses(this.results);
        this.states = this.vhss.populateStates(this.addresses);
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
      this.http.get('http://localhost:8080/qc/note/batch/' + batch.batchId + '/' + batch.weeks + '/')
        .subscribe((resp) => { console.log(resp.json()); this.overallBatchStatusArray.push(resp.json().qcStatus); });
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
      this.cities = this.vhss.populateCities(this.selectedBarState, this.addresses);
    }
    this.barChartData = this.vhbgs.fillChartData(this.results, this.barChartData, this.selectedBarState, '');
    this.hasBarChartData = true;
  }
  // after a city is selected, update the graph to reflect the selected city
  hasCity(city) {
    if (this.cities.size > 1) {
      this.hasBarChartData = false;
      this.barChartData = this.vhbgs.fillChartData(this.results, this.barChartData, this.selectedBarState, this.selectedBarCity);
      this.hasBarChartData = true;
    }
  }
  // used to call the modal
  onClick(event) {
    console.log(event);
  }

}
