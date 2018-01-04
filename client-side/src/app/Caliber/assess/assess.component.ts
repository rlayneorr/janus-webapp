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
  editingAssessment: Assessment = new Assessment();
  selectedAssessment: Assessment = new Assessment();

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
        this.selectedBatch = this.batches[3];
        this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
        this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, 1);
        this.noteService.fetchTraineeNotesByBatchIdByWeek(this.selectedBatch.batchId, 1);
      }
    });

    // Every time an assessment is created, a set of default grades are created.
    this.assessmentService.getSaved().subscribe(assessment => {
      console.log('subscription updated');

      this.selectedBatch.trainees.forEach(trainee => {
        console.log('looping');
        const grade = new Grade();
        grade.trainee = trainee;
        grade.score = 0;
        grade.assessment = assessment;
        const newDate = new Date();
        grade.dateReceived = new Date(newDate.getFullYear(), newDate.getMonth());
        this.gradeService.create(grade);
      });

    });

  }

  changeCategory(categorySelect: ElementRef) {
    const newCategory = $(categorySelect).find(':selected').val();
    this.newAssessment.category = this.findCategory(newCategory);
  }

  editCategory(categorySelect: ElementRef) {
    const newCategory = $(categorySelect).find(':selected').val();
    this.editingAssessment.category = this.findCategory(newCategory);
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

  editAssessment() {
    this.assessmentService.update(this.editingAssessment);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

  addWeek() {
    this.selectedBatch.weeks += 1;
    this.batchService.update(this.selectedBatch);
  }

  addAssessment() {
    this.newAssessment.week = this.selectedWeek;
    this.newAssessment.batch = this.selectedBatch;
    console.log(this.newAssessment);
    this.assessmentService.create(this.newAssessment);
  }

  selectAssessment(assessment: Assessment) {
    console.log(assessment);
    this.selectedAssessment = assessment;
    this.editingAssessment.assessmentId = this.selectedAssessment.assessmentId;
    this.editingAssessment.batch = this.selectedAssessment.batch;
    this.editingAssessment.category = this.selectedAssessment.category;
    this.editingAssessment.rawScore = this.selectedAssessment.rawScore;
    this.editingAssessment.type = this.selectedAssessment.type;
    this.editingAssessment.week = this.selectedAssessment.week;
  }

  counter(i: number) {
    return new Array(i);
  }

}
