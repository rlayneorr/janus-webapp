import { Component, OnInit, transition, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ReportingService } from '../../../services/reporting.service';
import { PDFService } from '../../../services/pdf.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  private traineeOverallRadar: Subscription[];
  private closeResult: string;

  constructor(private reportsService: ReportingService, private pdfService: PDFService, private modalService: NgbModal) { }

  // batch id of batch being viewed
  @Input() public batchId: number;
  // list of trainees (id) that could be displayed
  @Input() public traineesList: number[];
  // this is where trainee radar data is stored until it needs to be displayed
  public traineesData: any[] = [];
  // List of trainee names; will be label of a dataset if it needs to be displayed
  public traineesNames: string[] = [];
  // List of trainees (by id) to be displayed
  public trainees: number[] = [];
  // Datasets for chart to display - moves dataset in and out of array to control what is displayed
  public chartData: any[];
  // same but for the labels provided to the graph-data pipe
  public dataSetLabels: string[];

  // Chart type assignment
  public chartType = 'radar';

  ngOnInit() {

    this.traineeOverallRadar = [];
    this.chartData = [];
    // TODO: this is until I can get batch data from the api probably will be an input.
    this.dataSetLabels = ['batch'];
    this.batchOverallSubscription = this.reportsService.batchOverallRadar$.subscribe((result) => {

      if (!result) {
        // console.log('data not received');
        this.reportsService.fetchBatchOverallRadarChart(this.batchId);
      } else {
        // console.log('data received');
        // console.log(result);
        if (this.chartData === null) {
          this.chartData = [result.data];
        } else {
          if (this.batchId === result.params.batchId) {
            this.chartData.unshift(result.data);
          }
        }
      }
    });

    // create requests for radar data for each trainee in traineeList
    for (let i = 0; i < this.traineesList.length; i++) {
      this.traineeOverallRadar.push(this.reportsService.traineeOverallRadar$.subscribe((result) => {
        if (!result) {
          // console.log('data not received');
          this.reportsService.fetchTraineeOverallRadarChart(this.traineesList[i]);
        } else {
          if (this.traineesList[i] === result.params.traineeId) {
            // make sure the result belongs to me.

            if (this.traineesData === null) {
              // if array is null make a new one with this dataset
              this.traineesData = [result.data];
              this.traineesNames.push(this.traineesList[i].toString());
            } else {
              // add this dataset to array of datasets
              this.traineesData.push(result.data);
              this.traineesNames.push(this.traineesList[i].toString());
            }
          }
        }
      }));
    }
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

