import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service';
import { GradeService } from '../../services/grade.service';
import { Subscription } from 'rxjs/Subscription';
import { GranularityService } from '../services/granularity.service';

/**
 * Component will display a bar graph comparing the specific trainees
 * assessment for the specified week or overall if all weeks selected
 * compared to the batch average
 */
@Component({
  selector: 'app-assessment-breakdown',
  templateUrl: './assessment-breakdown.component.html',
  styleUrls: ['./assessment-breakdown.component.css']
})
export class AssessmentBreakdownComponent implements OnInit {

  private batchId: Number;
  private week: Number;
  private TraineeId: Number;

  private batchIdSub: Subscription;
  private weekSub: Subscription;
  private traineeIdSub: Subscription;

  private data: Array<any>;
  private labels: Array<string>;
  private dataSubscription: Subscription;

  private chartType = 'bar';
  private barChartLegend = true;

  constructor(private reportService: ReportingService, private granularityService: GranularityService) { }

  public options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Average'
        }
      }]
    }
  };

  ngOnInit() {

    this.dataSubscription = this.reportService.batchWeekTraineeBarChart$.subscribe(
      (result) => {
        if (result) {

          const incomingTraineeData: any = { data: [], label: 'Trainee' };
          const incomingBatchData: any = { data: [], label: 'Batch' };
          const incomingLabels: any = [];

          // Format data as chart expects it
          for (const key in result.data) {
            if (result.data.hasOwnProperty(key)) {

                // Fixing decimal length for charts
                incomingTraineeData.data.push(result.data[key][0].toFixed(2));
                incomingBatchData.data.push(result.data[key][1].toFixed(2));
                incomingLabels.push(key);

                this.data = [incomingTraineeData, incomingBatchData];
                this.labels = incomingLabels;
            }
          }
        } else {
          console.log('Failed to load assessment data');
        }
      });

      this.batchIdSub = this.granularityService.currentBatch$.subscribe(
          data => { this.batchId = data.batchId; this.tryFetch(); });

      this.weekSub = this.granularityService.currentWeek$.subscribe(
          data => { this.week = data; this.tryFetch(); });

      this.traineeIdSub = this.granularityService.currentTrainee$.subscribe(
          data => { this.TraineeId = data.traineeId; this.tryFetch(); });

    // this.reportService.fetchBatchWeekTraineeBarChart(2201, 1, 5532);
  }

  tryFetch() {
    if (this.batchIdSub && this.weekSub && this.traineeIdSub) {
      this.reportService.fetchBatchWeekTraineeBarChart(this.batchId, this.week, this.TraineeId);
    }
  }

}
