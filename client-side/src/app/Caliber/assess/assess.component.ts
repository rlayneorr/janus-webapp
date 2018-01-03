import { Component, OnInit, NgModule, ViewEncapsulation, ElementRef} from '@angular/core';
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
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/Category';
import { Note } from '../entities/Note';
import { NoteService } from '../services/note.service';
import * as $ from 'jquery';


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
  selectedWeek: number;
  categories: Category[] = [];
  notes: Note[] = [];

  newAssessment: Assessment = new Assessment();

  constructor(private modalService: NgbModal, private batchService: BatchService, private assessmentService: AssessmentService,
  private gradeService: GradeService, private categoryService: CategoryService, private noteService: NoteService) {

  }

  fetchNews(evt: any) {
    const id = evt.nextId;

    if (id === '+') {
      return;
    } else {
      this.getAssessments(id);
      this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, id);
      this.noteService.fetchTraineeNotesByBatchIdByWeek(this.selectedBatch.batchId, id);
      this.selectedWeek = id;
    }
  }

  ngOnInit() {
    this.selectedWeek = 1;
    this.batchService.fetchAll();
    this.categoryService.fetchAllActive();
    this.noteService.getList().subscribe(notes => this.notes = notes);
    this.assessmentService.getList().subscribe(assessment => this.assessments = assessment);
    this.gradeService.getList().subscribe(grade => this.grades = grade);
    this.categoryService.getList().subscribe(categories => {
      this.categories = categories;
      this.newAssessment.category = this.findCategory('Java');
    });
    this.batchService.getList().subscribe(batch => {
      this.batches = batch;
      if (this.batches.length !== 0) {
        this.selectedBatch = this.batches[0];
        this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
        this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
        this.noteService.fetchTraineeNotesByBatchIdByWeek(this.selectedBatch.batchId, 1);
      }
    });

  }

  changeCategory(categorySelect: ElementRef) {
    const newCategory = $(categorySelect).find(':selected').val();
    this.newAssessment.category = this.findCategory(newCategory);
  }

  findCategory(category: any): Category {
    let matchingCat;
    this.categories.forEach(element => {
      if (element.skillCategory === category) {
        matchingCat = element;
      }
    });

    return matchingCat;
  }

  getGrade(grade: Grade[]) {
    return grade[0];
  }

  getNote(note: Note[]) {
    return note[0].content;
  }

  open(content) {
    this.modalService.open(content);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

  addWeek() {
    this.selectedBatch.weeks += 1;
    this.batchService.update(this.selectedBatch);
  }

  addAssessment() {
    console.log(this.newAssessment);
    this.newAssessment.week = <number>this.selectedWeek;
    this.newAssessment.batch = this.selectedBatch;
    this.assessmentService.create(this.newAssessment);

    this.selectedBatch.trainees.forEach(trainee => {
      const grade = new Grade();
      grade.assessment = this.newAssessment;
      grade.trainee = trainee;
      grade.score = 0;
      const newDate = new Date();
      grade.dateReceived = new Date(newDate.getFullYear(), newDate.getMonth());
      console.log(grade);
      this.gradeService.create(grade);
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
