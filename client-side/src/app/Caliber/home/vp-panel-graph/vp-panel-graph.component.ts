import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/';
import { VpHomePanelGraphService } from '../../services/graph/vp-home-panel-graph.service';
import { ChartDataEntity } from '../../entities/ChartDataEntity';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-vp-panel-graph',
  templateUrl: './vp-panel-graph.component.html',
  styleUrls: ['./vp-panel-graph.component.css']
})
export class VpPanelGraphComponent implements OnInit {
  public panelChartData: ChartDataEntity;
  public hasPanelGraphData = false;
  constructor(private http: Http, private vhpgs: VpHomePanelGraphService) { }

  ngOnInit() {
    this.panelChartData = this.vhpgs.getPanelChartData();
    this.http.get(environment.getVpHomePanelChart, {withCredentials: true})
    .subscribe(
      (resp) => {
        this.panelChartData = this.vhpgs.fillPanelChartData(resp.json(), this.panelChartData);
        console.log(this.panelChartData);
        this.hasPanelGraphData = true;
      }

    );
  }

}
