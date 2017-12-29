import { Component, OnInit, NgModule, ViewEncapsulation} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule  } from '@angular/common/http';
import { Batch } from '../entities/Batch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';
import { AssessmentService } from '../services/assessment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GradeService } from '../services/grade.service';
import { Grade } from '../entities/Grade';
import { Trainee } from '../entities/Trainee';


@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssessComponent implements OnInit {

  assessment: Assessment;
  loading = false;

  batches: Batch[] = [];
  assessments: Assessment[] = [];
  selectedBatch: Batch = new Batch();
  grades: Grade[] = [];

  constructor(private modalService: NgbModal, private batchService: BatchService, private assessmentService: AssessmentService,
  private gradeService: GradeService) {

  }

  fetchNews(evt: any) {
    const id = evt.nextId;

    if (id === '+') {
      return;
    } else {
      this.getAssessments(id);
    }
  }

  ngOnInit() {
    this.batchService.fetchAll();
    this.batchService.getList().subscribe(batch => this.batches = batch);
    this.assessmentService.getList().subscribe(assessment => this.assessments = assessment);
    this.gradeService.getList().subscribe(grade => this.grades = grade);
  }

  open(content) {
    this.modalService.open(content);
  }

  debug() {
    this.selectedBatch = this.batches[0];
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

  addWeek() {
    this.selectedBatch.weeks += 1;
    this.batchService.update(this.selectedBatch);
  }

  addAssessment(type, category, score) {
    const newAssess = new Assessment();
    newAssess.category = category;
    newAssess.type = type;
    newAssess.rawScore = score;
  }

  getGrade(traineeId, assessmentId) {
    this.grades.forEach(grade => {
      if (grade.trainee.traineeId === traineeId && grade.assessment.assessmentId === assessmentId) {
        return grade.score;
      }
    });


  }



  counter(i: number) {
    return new Array(i);
  }

}
