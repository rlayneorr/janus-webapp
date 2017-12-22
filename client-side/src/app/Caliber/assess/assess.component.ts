import { Component, OnInit, NgModule} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';
import { Batch } from '../entities/Batch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';
import { AssessmentService } from '../services/assessment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {

  closeResult: string;
  register= {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
  };

  assessment: Assessment;
  loading = false;

  batches: Batch[] = [];
  assessments: Assessment[] = [];
  selectedBatch: Batch = new Batch();

  constructor(private modalService: NgbModal, private batchService: BatchService, private assessmentService: AssessmentService) {

  }

  ngOnInit() {
    this.batchService.fetchAll();
    this.assessmentService.getList().subscribe(assessment => this.assessments = assessment);
    this.batchService.getList().subscribe(batch => this.batches = batch);

  }

  open(content) {
    this.modalService.open(content);
    this.selectedBatch = this.batches[0];
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

  counter(i: number) {
    return new Array(i);
  }

}
