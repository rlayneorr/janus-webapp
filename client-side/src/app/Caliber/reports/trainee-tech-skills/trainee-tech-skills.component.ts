import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReportingService } from '../../../services/reporting.service';

@Component({
  selector: 'app-trainee-tech-skills',
  templateUrl: './trainee-tech-skills.component.html',
  styleUrls: ['./trainee-tech-skills.component.css']
})
export class TraineeTechSkillsComponent implements OnInit {

  private chartData: any = [new Map([['test', 1]]
  )];
  private dataSubscription: Subscription;


  constructor(private reportsService: ReportingService) { }



  // Chart labels
  public radarChartLabels: string[] = ['AWS', 'Hibernate', 'JSP', 'Java', 'JavaScript', 'REST', 'SOAP', 'SQL', 'Spring'];
  public dataSetLabels: string[] = ['Skills'];
 
  // Dataset for chart
  // Chart type assignment
  public chartType = 'radar';

  ngOnInit() {
    this.dataSubscription = this.reportsService.batchOverallRadar$.subscribe((result) => {

      console.log(result);

      if (!result) {
        console.log('data not received');
        this.chartData = null;
        this.reportsService.fetchBatchOverallRadarChart(2201);
        // this.reportsService.fetchTraineeOverallRadarChart(5455);
      } else {
        console.log('data received');
        console.log(result);
        // this.chartData = [this.dataSet(result.data, 'Skills')];
        this.chartData = [result.data];
        // this.rawDatatoMap(result.data);
      }
    });
  }
  /**
   * create object for charts.
  */
  
}
