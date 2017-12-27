import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReportingService } from '../../../services/reporting.service';

@Component({
  selector: 'app-trainee-tech-skills',
  templateUrl: './trainee-tech-skills.component.html',
  styleUrls: ['./trainee-tech-skills.component.css']
})
export class TraineeTechSkillsComponent implements OnInit {


  private batchOverallSubscription: Subscription;
  private traineeOverallRadar: Subscription[];


  constructor(private reportsService: ReportingService) { }


  public trainees: number[];

  // Chart labels - this will be dynamic later
  public dataSetLabels: string[];

  // Dataset for chart
  public chartData: any[];

  // Chart type assignment
  public chartType = 'radar';

  ngOnInit() {

    this.traineeOverallRadar = [];
    this.chartData = [];
    this.trainees = [5536, 5534, 5531, 5535, 5537, 5538, 5539];
    // this.trainees = [5536];
    this.dataSetLabels = ['batch'];
    this.batchOverallSubscription = this.reportsService.batchOverallRadar$.subscribe((result) => {

      if (!result) {
        // console.log('data not received');
        this.reportsService.fetchBatchOverallRadarChart(2201);
      } else {
        // console.log('data received');
        // console.log(result);
        if (this.chartData === null) {
          this.chartData = [result.data];
        } else {
          this.chartData.unshift(result.data);
        }
      }
    });

    for (let i = 0; i < this.trainees.length; i++) {
      this.traineeOverallRadar.push(this.reportsService.traineeOverallRadar$.subscribe((result) => {
        if (!result) {
          // console.log('data not received');
          this.reportsService.fetchTraineeOverallRadarChart(this.trainees[i]);
        } else {
          // console.log('data received');
          // console.log(result);
          if (this.trainees[i] === result.params.traineeId) {
            if (this.chartData === null) {
              this.chartData = [result.data];
              this.dataSetLabels.push(this.trainees[i].toString());
            } else {
              this.chartData.push(result.data);
              this.dataSetLabels.push(this.trainees[i].toString());
            }
          }
        }
      }));
    }
  }
}
