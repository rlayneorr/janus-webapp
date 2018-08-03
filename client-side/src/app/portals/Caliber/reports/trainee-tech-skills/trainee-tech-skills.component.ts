import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ReportingService} from '../../services/reporting.service';
import {PDFService} from '../../services/pdf.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GranularityService} from '../services/granularity.service';
import {CompleteBatch} from '../../../../caliber-client/aggregator/entities/CompleteBatch';
import {GambitTrainee} from '../../../../caliber-client/entities/GambitTrainee';

/**
 * @author John Hudson
*/
@Component({
  selector: 'app-trainee-tech-skills',
  templateUrl: './trainee-tech-skills.component.html',
  styleUrls: ['./trainee-tech-skills.component.css']
})
export class TraineeTechSkillsComponent implements OnInit {


  private batchOverallSubscription: Subscription;
  private traineeOverallRadar: Subscription;
  private traineeWeeklyRadar: Subscription;
  private weekBatchFilter: Subscription;
  private granularity: Subscription;
  private overallBatchFilter: Subscription;

  private batchSubscription: Subscription;
  private weekSubscription: Subscription;
  private traineeSubscription: Subscription;

  private closeResult: string;

  constructor(private reportsService: ReportingService,
    private pdfService: PDFService, private modalService: NgbModal, private granularityService: GranularityService) { }

  // batch id of batch being viewed
  public batch: CompleteBatch;
  // current week
  public week: Number = 0;
  // current trainee
  public trainee: GambitTrainee = new GambitTrainee();
  // list of trainees (id) that could be displayed
  public traineesList: number[] = [];
  // this is where trainee radar data is stored until it needs to be displayed
  public traineesData: any[] = [];
  // List of trainee names; will be label of a dataset if it needs to be displayed
  public traineesNames: string[] = [];
  // List of trainees (by id) to be displayed
  public trainees: number[] = [];
  // Datasets for chart to display - moves dataset in and out of array to control what is displayed
  public chartData: any[];
  // same but for the labels provided to the graph-data pipe
  public dataSetLabels: string[] = [];

  private overallDataFlag: boolean;
  private traineeDataFlag: boolean;

  // filename for download button
  private filename = 'Technical Skills.pdf';

  // Chart type assignment
  public chartType = 'radar';
  /**
   * Sets up all data for component
   * calls functions for setup
   */
  ngOnInit() {
    this.chartData = [];
    // set up batch overall sub; put data in index 0 of chartData
    this.batchOverallSubscription = this.reportsService.batchOverallRadar$.subscribe((result) => {
      if (result) {
        if (this.batch) {
          if (this.batch.batchId === result.params.batchId) {
            if (!this.overallDataFlag) {
              this.overallDataFlag = true;
              this.chartData.unshift(result.data);
            }
          }
        }
      }
    });
    // set up trainee overall sub
    this.traineeOverallRadar = this.reportsService.traineeOverallRadar$.subscribe((result) => {
      if (result) {

        if (this.trainee.traineeId !== 0) {
          if (!this.traineeDataFlag) {
            this.traineeDataFlag = true;
            this.chartData.push(result.data);
          }
        } else {
          this.traineesData[this.traineesList.indexOf(result.params.traineeId)] = result.data;
        }
      }
    });
    // set up trainee weekly sub
    this.traineeWeeklyRadar = this.reportsService.traineeWeeklyRadar$.subscribe((result) => {
      if (result) {
        if (!this.traineeDataFlag) {
          this.chartData.push(result.data);
          this.traineeDataFlag = true;
        }
      }
    });

    // granulity week sub
    this.weekSubscription = this.granularityService.currentWeek$.subscribe(
      (result) => {
        if (result !== this.week) {
          this.week = result;
        }
      });
    // granularity trainee sub
    this.traineeSubscription = this.granularityService.currentTrainee$.subscribe(
      (result) => {
        if (result !== this.trainee) {
          this.trainee = result;
        }
      });

    // granularity batch sub; controls what setup is run.
    this.batchSubscription = this.granularityService.currentBatch$.subscribe(
      (result) => {
        if (this.batch) {
          if (result.batchId !== this.batch.batchId) {
            this.batch = result;
          }
        } else {
          this.batch = result;
        }
      });
    this.granularity = Observable.combineLatest(this.granularityService.currentBatch$,
      this.granularityService.currentTrainee$, this.granularityService.currentWeek$).subscribe(() => {
        this.setUp();
      });
    // data formating for weekly trainee chart
    // this is a subscription since it need both datasets to be updated
    this.weekBatchFilter = Observable.combineLatest(this.reportsService.batchOverallRadar$,
      this.reportsService.traineeWeeklyRadar$).subscribe(
      () => {
        // only do this there is enough data
        if (this.chartData.length === 2) {

          // swap the batch and trainee data for display purposes
          let swap = this.chartData[1];
          this.chartData[1] = this.chartData[0];
          this.chartData[0] = swap;

          swap = this.dataSetLabels[1];
          this.dataSetLabels[1] = this.dataSetLabels[0];
          this.dataSetLabels[0] = swap;

          // need the datasets to be the same length so shorten the overall dataset
          this.dataSetAlign();
        }
      }
      );
    this.overallBatchFilter = Observable.combineLatest(this.reportsService.batchOverallRadar$,
      this.reportsService.traineeOverallRadar$).subscribe(
      () => {
        // only do this there is enough data
        if (this.chartData.length === 2) {
          // need the datasets to be the same length so shorten the overall dataset
          this.dataSetAlign();
        }
      }
      );
  }


  /**
   * general set up would go here.
   */
  setUp() {
    if (this.batch) {
      this.chartData = [];
      this.dataSetLabels = [];
      this.overallDataFlag = false;
      this.traineeDataFlag = false;
      this.dataSetLabels = [this.batch.trainingName];
      this.reportsService.fetchBatchOverallRadarChart(this.batch.batchId);
      if (this.week === 0 && this.trainee.traineeId === 0) {
        this.overallSetup();
      } else if (this.trainee.traineeId !== 0) {
        this.weekSetup();
      }
    }
  }

  /**
   * Resets radar, to avoid issues with nonloading radar
   */
  radarReset() {
    this.trainees = [];
    this.chartData = [];
  }


  /**
   * Sets up some variables and send requests for overall radar
   */
  overallSetup() {
    this.radarReset();
    for (let i = 0; i < this.batch.trainees.length; i++) {
      this.traineesList.push(this.batch.trainees[i].traineeId);
      this.traineesNames[i] = this.batch.trainees[i].traineeUserInfo.firstName;
    }

    this.reportsService.fetchBatchOverallRadarChart(this.batch.batchId);
    // create requests for radar data for each trainee in traineeList
    this.traineesData = new Array<any>(this.traineesList.length);
    for (let i = 0; i < this.traineesList.length; i++) {
      this.reportsService.fetchTraineeOverallRadarChart(this.traineesList[i]);
    }
  }
  /**
   * Sets up some variables and send requests for weekly radar
   */
  weekSetup() {
    this.radarReset();
    if (this.batch.batchId) {
      this.dataSetLabels.push(this.trainee.traineeUserInfo.firstName);

      if (this.week === 0) {
        this.reportsService.fetchTraineeOverallRadarChart(this.trainee.traineeId);
      } else {
        this.reportsService.fetchTraineeUpToWeekRadarChart(this.week, this.trainee.traineeId);
      }
    }
  }

  /**
   * makes datasets the same length
   */
  dataSetAlign() {
    if (Object.entries(this.chartData[1]).length !== Object.entries(this.chartData[0]).length) {
      const objArr = [];
      // change the objects into arrays
      const longArr = Object.entries(this.chartData[1]);
      const shortArr = Object.entries(this.chartData[0]);

      for (let i = 0; i < longArr.length; i++) {
        for (let j = 0; j < shortArr.length; j++) {
          if (longArr[i][0] === shortArr[j][0]) {
            objArr.push(longArr[i]);
          }
        }
      }
      // make a new object from the array
      this.chartData[1] = {};
      for (let i = 0; i < objArr.length; i++) {
        this.chartData[1][objArr[i][0]] = objArr[i][1];
      }
    }
  }
  /**
   * downloads pdf via pdf service
  */
  downloadPDF() {
    this.pdfService.downloadPDFwithFilename('trainee-tech-skills', this.filename);
  }
  /**
   * Opens the trainee selector modal
   * @param content
   */
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  /**
   * closes the trainee selector modal
   * @param reason
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * Adds/removes trainee from chart based on modal checks
   * @param index is the index to the trainee in traineesList to be added/removed from chartData
  */
  traineeChecked(index: number) {
    if (this.trainees.includes(this.traineesList[index])) {
      this.trainees = this.remove(this.trainees, this.traineesList[index]);
      this.chartData = this.remove(this.chartData, this.traineesData[index]);
      this.dataSetLabels = this.remove(this.dataSetLabels, this.traineesNames[index]);
    } else {
      this.trainees.push(this.traineesList[index]);
      this.dataSetLabels = this.dataSetLabels.concat([this.traineesNames[index]]);
      this.chartData = this.chartData.concat([this.traineesData[index]]);
    }
  }
  /**
   * removes a single element from an array
   * @param array
   * @param element
   */
  remove(array: any[], element: any) {
    return array.filter(e => e !== element);
  }
}

