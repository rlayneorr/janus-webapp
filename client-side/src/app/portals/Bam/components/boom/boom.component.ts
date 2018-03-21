import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BatchService } from '../../services/batch.service';
import { Batch } from '../../models/batch.model';
import { Subtopic } from '../../models/subtopic.model';
import { CalendarService } from '../../services/calendar.service';
import { Boom } from '../../models/boom.model';

@Component({
  selector: 'app-boom',
  templateUrl: './boom.component.html',
  styleUrls: ['./boom.component.css']
})
/**
 * This class creates 2 charts:
 * Pie and a bar graph.
 * @author Francisco Palomino | Batch: 1712-dec10-java-steve
 */
export class BoomComponent implements OnInit {

  @ViewChild('barChart') barChart: ElementRef;
  @ViewChild('pieChart') pieChart: ElementRef;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function(tooltipItem, data) {
          return tooltipItem.yLabel + '%';
        }
      }
    },
    responsive: true
  };
  public pieChartOptions: any = {
    tooltips: {displayColors: false},
    legend: {position: 'left'},
  };
  public barChartLabels: string[] = [];
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = false;
  public barColors: any = [{fill: true, backgroundColor: '#ff9945' },
                           {fill: true, backgroundColor: '#b63e4f' }];
  public barChartData: any[] = [];

  public pieChartLegend: Boolean = false;
  public pieChartLabels: string[][] = [];
  public pieChartData: number[] = [];
  public pieChartDatasets: any[] = [];
  public pieColors: any = [{fill: true, backgroundColor: ['#ff9945', '#b63e4f'] }];
  public pieChartType: String = 'pie';

  public percent: Number = 90;
  public batches: any[] = [];
  public chartHeight: Number = 345;
  public pieChartHeight: Number = 345;
  public batchOverallArray: any = [];

  public currentBatches: Batch[] = [];
  public batchSelectionList: Batch[] = [];
  public allBatchSubtopics: Subtopic[][] = [];

  constructor(private batchService: BatchService, private calendarService: CalendarService) { }

  ngOnInit() {
    this.batchService.getAllInProgress().subscribe(
      getBatches => {
        this.currentBatches = getBatches;
        this.currentBatches.sort((n1, n2) => {
          if (n1.startDate > n2.startDate) {
            return 1;
          }
          if (n1.startDate < n2.startDate) {
            return -1;
          }
          return 0;
        });
        this.getBatchSubtopics();
      }
    );
  }
/**
 * Gets all currently active batches from Bam DB
 * @author Francisco Palomino | Batch: 1712-dec10-java-steve
 */
  getBatchSubtopics() {
    let count = 1;
    this.currentBatches.forEach((batch, index) => {
      this.calendarService.getSubtopicsByBatch(batch.id).subscribe(
        subtopicsService => {
          if (subtopicsService != null) {
            subtopicsService.sort((n1, n2) => {
              if (n1.subtopicDate > n2.subtopicDate) {
                return 1;
              }
              if (n1.subtopicDate < n2.subtopicDate) {
                return -1;
              }
              return 0;
            });
          }
          this.allBatchSubtopics[index] = subtopicsService;
          count++;
          if (count > this.currentBatches.length) {
            this.setBatchStats();
            this.plotBatch(this.batchSelectionList[0].id);
            this.pieChartPercent(this.percent);
          }
        }
      );
    });
  }
  /**
   * Method returns the week of a current date
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param date
   */
  getWeek(date) {
    const thisYear = new Date().getFullYear();
    const subtopicDate: any = new Date(date);
    const jan4th: any = new Date(`04/jan/${thisYear}`);
    return Math.ceil((((subtopicDate.setHours(0, 0, 0, 0) -
          jan4th.setHours(0, 0, 0, 0)) / 86400000) + jan4th.getDay() + 1) / 7);
  }
  /**
   * Method generates all the statistics of all current active batches and
   * their completedted and missed subtopics
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   */
  setBatchStats () {
    for (let i = 0; i < this.currentBatches.length; i++) {
      let totalSubtopics = 0, completedSubtopics = 0, missedSubtopics = 0;
      let currentWeek;
      if (this.allBatchSubtopics[i] != null) {
        this.batchSelectionList.push(this.currentBatches[i]);
        const today = new Date();
        const startDate = new Date(this.currentBatches[i].startDate);
        const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        currentWeek = Math.ceil(diffDays / 7);
        let checkWeek = this.getWeek(startDate);
        for (let week = 1; week <= currentWeek; week++) {
          for (let y = 0; y < this.allBatchSubtopics[i].length; y++) {
            if (checkWeek === this.getWeek(this.allBatchSubtopics[i][y].subtopicDate)) {
              if (this.allBatchSubtopics[i][y].status.id === 2) {
                totalSubtopics++;
                completedSubtopics++;
              } else if (this.allBatchSubtopics[i][y].status.id === 4) {
                totalSubtopics++;
                missedSubtopics++;
              }
            }
          }
          checkWeek = this.getWeek(startDate.setDate(startDate.getDate() + 7));
        }
        const batch: Boom = new Boom();
        batch.batchName = this.currentBatches[i].name;
        batch.trainerName  = this.currentBatches[i].trainer.fName + ' ' + this.currentBatches[i].trainer.lName;
        batch.missed = missedSubtopics;
        batch.completed = completedSubtopics;
        batch.total = totalSubtopics;
        batch.week = currentWeek;
        this.batches.push(batch);
      }
    }
  }
  /**
   * Creates a bar chart of a trainer/batch's weekly progress.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param id selected batch/trainer
   */
   plotBatch(id: Number) {
    const completedSubtop: any[] = [];
    const missedSubTop: any[] = [];
    for (let i = 0; i < this.currentBatches.length; i++) {
      if (this.allBatchSubtopics[i] != null && this.currentBatches[i].id === id) {
        if ( this.currentBatches[i].id === id) {
          const today = new Date();
          const startDate = new Date(this.currentBatches[i].startDate);
          const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
          const currentWeek = Math.ceil(diffDays / 7);
          let checkWeek = this.getWeek(startDate);
          for (let week = 1; week <= currentWeek; week++) {
            let totalSubtopics = 0;
            let completedSubtopics = 0;
            let missedSubtopics = 0;
            this.barChartLabels.push('Week ' + (week));
            for (let y = 0; y < this.allBatchSubtopics[i].length; y++) {
              if (checkWeek === this.getWeek(this.allBatchSubtopics[i][y].subtopicDate)) {
                if (this.allBatchSubtopics[i][y].status.id === 2) {
                  totalSubtopics++;
                  completedSubtopics++;
                } else if (this.allBatchSubtopics[i][y].status.id === 4) {
                  totalSubtopics++;
                  missedSubtopics++;
                }
              }
            }
            checkWeek = this.getWeek(startDate.setDate(startDate.getDate() + 7));
            completedSubtop.push(Number(completedSubtopics / totalSubtopics * 100).toFixed(2));
            missedSubTop.push(Number(missedSubtopics / totalSubtopics * 100).toFixed(2));
          }
        }
        this.barChartData = [
          { data: completedSubtop, label: 'Completed', fill: true,
          backgroundColor: '#ff9945' },
          { data: missedSubTop, label: 'Missed', fill: true,
          backgroundColor: '#b63e4f' }
        ];
        break;
      }
    }
  }
  /**
   * Creates a pie chart from all current active batches and graphs
   * with a default 90% completion value, which can be changed on
   * the client view.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param percent percent value to generate the pie graph
   */
  public pieChartPercent(percent) {
    const allCompletedSubtop: any[] = [];
    const allMissedSubTop: any[] = [];
    const labelComplete: any[] = [];
    const labelMissed: any[] = [];
    this.batchOverallArray = [];
    this.percent = percent;
    labelComplete.push('Batches');
    labelMissed.push('Batches');

    for (let i = 0; i < this.batches.length; i++) {
      let totalCompletedAvg: any = 0;
      let totalMissedAvg: any = 0;

      totalCompletedAvg = Number((this.batches[i].completed / this.batches[i].total * 100).toFixed(2));
      totalMissedAvg = Number((this.batches[i].missed / this.batches[i].total * 100).toFixed(2));

      const trainer = {
        bName: this.batches[i].batchName,
        trainer: this.batches[i].trainerName,
        missed: this.batches[i].missed,
        completed: this.batches[i].completed,
        total: this.batches[i].total,
        week: this.batches[i].week
      };

      this.batchOverallArray.push(trainer);

      if (totalCompletedAvg >= percent) {
        labelComplete.push(this.batches[i].batchName + ' ' + totalCompletedAvg + '%');
      } else {
        labelMissed.push(this.batches[i].batchName + ' ' + totalCompletedAvg + '%');
      }

    }
    this.pieChartLabels = [labelComplete, labelMissed];
    this.pieChartData.push(labelComplete.length - 1);
    this.pieChartData.push(labelMissed.length - 1);

    this.pieChartDatasets = [{ data : this.pieChartData}];
  }
  /**
   * Method takes in a a number between 0 and 100 to recreate
   * the pie chart.
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param event used to prevent input
   * @param percent percent input
   */
  changePercent(event: any, percent: Number) {
    if (percent === this.percent && String(percent).length > 1) {
      event.preventDefault();
      return;
    }
    this.pieChartHeight = $(this.pieChart.nativeElement.lastElementChild).height();
    $(this.pieChart.nativeElement).css('min-height', this.pieChartHeight + 'px');
    this.pieChartData = [];
    this.pieChartLabels = [];
    this.pieChartDatasets = [];
    if (String(percent) !== '') {
      setTimeout(() => {
        this.pieChartPercent(percent);
      }, 0);
    }
  }
  /**
   * Validates that only numbers are entered in the input field
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param event current typed character
   * @param value the whole input value
   */
  checkInput(event: any, value) {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)
        || inputChar === ' '
        || Number(value + inputChar) > 100
        || Number(inputChar + value) === 0) {
      event.preventDefault();
      return;
    }
  }
  /**
   * Recreates Bar chart with the selected trainer/batch
   * @author Francisco Palomino | Batch: 1712-dec10-java-steve
   * @param id selected batch/trainer
   */
  changeBatch(id) {
    this.chartHeight = $(this.barChart.nativeElement.lastElementChild).height();
    $(this.barChart.nativeElement).css('min-height', this.chartHeight + 'px');
    this.barChartData = [];
    this.barChartLabels = [];
    setTimeout(() => {
          this.plotBatch(id);
    }, 0);
  }
}
