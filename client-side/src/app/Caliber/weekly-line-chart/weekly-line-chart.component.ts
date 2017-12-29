import { Component, OnInit } from '@angular/core';

import { ReportingService } from '../../services/reporting.service';
import { environment } from '../../../environments/environment';
import { PDFService } from '../../services/pdf.service';
import { Subscription } from 'rxjs/Subscription';

/**
 * This component display the weekly line chart. It also has a download
 * button that allows to save the graph as a PDF.
 * @author Edel Benavides
 */

@Component({
  selector: 'app-weekly-line-chart',
  templateUrl: './weekly-line-chart.component.html',
  styleUrls: ['./weekly-line-chart.component.css']
})
export class WeeklyLineChartComponent implements OnInit {

  // public chartData: any = [];

  
  public chartData: any = [{
    data: new Map([
      [1, 90.1]
    ]), label: 'batch'
  },
  {
    data: new Map([
      [1, 90.1],
      [2, 65],
      [3, 92.1],
      [5, 67.7],
      [6, 86.46],
      [7, 67.68],
      [8, 78],
      [9, 87.16],
      [10, 93],
      [11, 76],
      [12, 63.25],
      [13, 75],
      [14, 81],
      [15, 79]
    ]), label: 'batch'
  }];

  private dataSubscription: Subscription;

  constructor(private reportsService: ReportingService, private pdfService: PDFService) { }

  // Chart labels - for other charts the labels would have to be dynamic
  public dataSetLabels: string[] = ['Skills'];

  // Dataset for chart
  // Chart type assignment
  public chartType = 'bar';

  ngOnInit() {
    this.dataSubscription = this.reportsService.batchOverallBar$.subscribe((result) => {

      if (!result) {
        console.log('data not received');
        // this.chartData = null;
        this.reportsService.fetchBatchOverallBarChart(2201);
      } else {
        console.log('data received');
        console.log(result);
        this.chartData = [result.data];
      }
    });
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  /**
   * Downloads weekly chart as a PDF file.
   */
  public downloadPDF(): void {
    this.pdfService.downloadPDF('chart');
  }

}
