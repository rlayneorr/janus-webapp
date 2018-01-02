import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { WeeklyProgress } from '../../entities/weeklyProgress';
import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { VpHomeLineGraphService } from '../../services/graph/vp-home-line-graph.service';
import { VpHomeSelectorService } from '../../services/selector/vp-home-selector.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ColorService } from '../../services/colors/color.service';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vp-line-graph',
  templateUrl: './vp-line-graph.component.html',
  styleUrls: ['./vp-line-graph.component.css']
})
export class VpLineGraphComponent implements OnInit {
  public results: Array<WeeklyProgress>;
  public addresses = [];
  public lineChartData: ChartDataEntity;
  public hasData = false;
  public selectedLineState = '';
  public selectedLineCity = '';
  public states: Set<string>;
  public cities: Set<string>;
  public selectedState = false;

  constructor(private http: Http,
    private vhlgs: VpHomeLineGraphService,
    private vhss: VpHomeSelectorService,
    private cs: ColorService) { }

  ngOnInit() {
    this.lineChartData = this.vhlgs.getLineChartData();
    this.http.get(environment.getVpHomeLineChart, { withCredentials: true })
      .subscribe(
      (resp) => {
        this.results = resp.json();
        this.results.sort();
        this.lineChartData = this.vhlgs.fillChartData(this.results, this.lineChartData, '', '');
        this.addresses = this.vhss.populateAddresses(this.results);
        this.states = this.vhss.populateStates(this.addresses);
        this.hasData = true;
      });
  }
  // called when a state is selected to get cities for the cities drop down
  // as well as re-populate the chartData
  findCities(state) {
    this.hasData = false;
    this.selectedLineCity = '';
    if (state === '') {
      this.selectedState = false;
    } else {
      this.selectedState = true;
      this.cities = this.vhss.populateCities(this.selectedLineState, this.addresses);
    }
    this.lineChartData = this.vhlgs.fillChartData(this.results, this.lineChartData, this.selectedLineState, '');
    this.hasData = true;
  }
  // after a city is selected, update the graph to reflect the selected city
  hasCity(city) {
    if (this.cities.size > 1) {
      this.lineChartData = this.vhlgs.fillChartData(this.results, this.lineChartData, this.selectedLineState, this.selectedLineCity);
      this.hasData = true;
    }
  }
}
