import { Component, OnInit, transition, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ReportingService } from '../../../services/reporting.service';
import { PDFService } from '../../../services/pdf.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GranularityService } from '../services/granularity.service';
import { Trainee } from '../../entities/Trainee';
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
  private batchIdSubscription: Subscription;
  private batchSubscription: Subscription;
  private traineeOverallRadar: Subscription[];
  private closeResult: string;

  constructor(private reportsService: ReportingService,
    private pdfService: PDFService, private modalService: NgbModal, private granularityService: GranularityService) { }

  // batch id of batch being viewed
  public batchId: number;
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

  // Chart type assignment
  public chartType = 'radar';

  ngOnInit() {

    this.traineeOverallRadar = [];
    this.chartData = [];
    this.dataSetLabels = [];

    this.batchOverallSubscription = this.reportsService.batchOverallRadar$.subscribe((result) => {
      if (result) {
        if (this.chartData === null) {
          this.chartData = [result.data];
        } else {
          if (this.batchId === result.params.batchId) {
            this.chartData.unshift(result.data);
          }
        }
      }
    });


    console.log('tech radar');
    this.batchIdSubscription = this.granularityService.currentBatch$.subscribe(
      (result) => {
        if (result.batchId !== this.batchId) {
          this.batchId = result.batchId;
          this.dataSetLabels.push(result.trainingName);
          // console.log(this.batchId);

          for (let i = 0; i < result.trainees.length; i++) {
            this.traineesList.push(result.trainees[i].traineeId);
            this.traineesNames.push(result.trainees[i].name);
            this.dataSetLabels.push(result.trainees[i].name);
            // console.log(result.trainees[i].traineeId);
          }

          this.reportsService.fetchBatchOverallRadarChart(this.batchId);

          // create requests for radar data for each trainee in traineeList
          for (let i = 0; i < this.traineesList.length; i++) {
            this.traineeOverallRadar.push(this.reportsService.traineeOverallRadar$.subscribe((radarResult) => {
              if (radarResult) {
                if (this.traineesList[i] === radarResult.params.traineeId) {
                  // make sure the result belongs to me.

                  if (this.traineesData === null) {
                    // if array is null make a new one with this dataset
                    this.traineesData = [radarResult.data];
                  } else {
                    // add this dataset to array of datasets
                    this.traineesData.push(radarResult.data);

                  }
                }
              }
            }));
          }
        }
      });

  }
  /**
   * downloads pdf via pdf service
  */
  downloadPDF() {
    this.pdfService.downloadPDF('trainee-tech-skills');
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
  remove(array: any[], element: any) {
    return array.filter(e => e !== element);
  }
}

