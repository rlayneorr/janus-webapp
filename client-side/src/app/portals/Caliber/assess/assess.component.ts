import { Component, OnInit, NgModule, ViewEncapsulation, ElementRef} from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule  } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';
import { AssessmentService } from '../services/assessment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GradeService } from '../services/grade.service';
import { Grade } from '../entities/Grade';
import { Note } from '../entities/Note';
import { NoteService } from '../services/note.service';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeByTraineeByAssessmentPipe } from '../pipes/grade-by-trainee-by-assessment.pipe';
import { NoteByTraineeByWeekPipe } from '../pipes/note-by-trainee-by-week.pipe';
import { DatePipe } from '@angular/common';
import { ScrollEvent } from 'ngx-scroll-event';
import { window } from 'rxjs/operators/window';
import { HostListener } from '@angular/core/src/metadata/directives';
import { HydraBatchService } from '../../../hydra-client/services/batch/hydra-batch.service';
import { CompleteBatch } from '../../../hydra-client/aggregator/entities/CompleteBatch';
import { HydraBatchUtilService } from '../../../services/hydra-batch-util.service';
import { HydraTrainee } from '../../../hydra-client/entities/HydraTrainee';
import { GambitSkillService } from '../../../hydra-client/services/skill/gambit-skill.service';
import { GambitSkill } from '../../../hydra-client/entities/GambitSkill';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class AssessComponent implements OnInit {
  assessment: Assessment;

  batches: any[] = []; // this should not be of type any but whoever refactored it to HydraBatch did not do it right - blake
  assessments: Assessment[] = [];
  selectedBatch: any = new CompleteBatch();
  grades: Grade[] = [];
  updatingGrades: Set<Grade> = new Set<Grade>();
  selectedWeek: number;
  skills: Array<GambitSkill>;
  notes: Note[] = [];
  rForm: FormGroup;

  newAssessment: Assessment = new Assessment();
  editingAssessment: Assessment = new Assessment();
  selectedAssessment: Assessment = new Assessment();

  years: Set<any> = new Set<any>();
  currentYear = 0;
  yearBatches: CompleteBatch[] = [];
  selectedTrainees: HydraTrainee[] = [];

  pageOffsetValue;
  constructor(private modalService: NgbModal, private batchService: HydraBatchService, private assessmentService: AssessmentService,
    private gradeService: GradeService, private skillService: GambitSkillService, private noteService: NoteService,
    private fb: FormBuilder, private datePipe: DatePipe, private batchUtil: HydraBatchUtilService) {}

  getPageOffsetHeight(event: ScrollEvent) {
    this.pageOffsetValue = pageYOffset;
  }

  // This event is called when the user switches tabs (for Weeks).
  fetchNews(evt: any) {
    const id = evt.nextId;

    if (id === '+') {
      this.modalService.open(document.getElementById('addWeek'));
      return;
    } else {
      this.getAssessments(id);
      this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, id);
      this.selectedWeek = id;
      this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, id);
    }
  }


  ngOnInit() {

    this.selectedWeek = 1;

    this.batchService.fetchAll();

    this.skillService.findAllActive().subscribe(skills => {
      this.skills = skills;
      this.newAssessment.skill = this.findSkill('Java');
    });

    this.noteService.getList().subscribe(notes => {
      this.notes = notes;
    });

    this.assessmentService.getList().subscribe(assessment => this.assessments = assessment);

    this.gradeService.listSubject.subscribe(grade => this.grades = grade);

    this.gradeService.saveSubject.subscribe(grade => {
      this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    });

    this.batchService.fetchAll().subscribe(batch => {
      this.batches = batch;

      if (this.batches.length !== 0) {
        // Set the year dropdown.
        this.batches.forEach(b => {
          this.years.add(this.datePipe.transform(b.startDate, 'yyyy'));
          const sDate = new Date(b.startDate);
          if (sDate.getFullYear() > this.currentYear) {
            this.currentYear = sDate.getFullYear();
          }
        });

        this.switchYear(this.currentYear);
        this.changeBatch(this.yearBatches[0]);
        this.selectedWeek = this.batchUtil.getWeek(this.selectedBatch);
      }
    });

    // Every time an assessment is created, a set of default grades is created.
    this.assessmentService.getSaved().subscribe(assessment => {
      this.selectedBatch.trainees.forEach(trainee => {
        const grade = new Grade();
        grade.trainee = trainee;
        grade.score = 0;
        grade.assessment = assessment;
        const newDate = new Date();
        grade.dateReceived = new Date('01-01-2000');
        this.gradeService.create(grade);
      });

    });

  }

/****************************************************************************************
                                      ASSESSMENTS
*****************************************************************************************/

  editAssessment(content, modalAssessment: Assessment) {
    this.editingAssessment = modalAssessment;
    this.modalService.open(content);
  }

  updateAssessment() {
    this.assessmentService.update(this.editingAssessment);
  }

  deleteAssessment() {
    this.assessments.forEach(a => {
      if (Number(a.assessmentId) === Number(this.editingAssessment.assessmentId)) {
        this.assessments.splice(this.assessments.indexOf(a), 1);
      }
    });
    this.assessmentService.delete(this.editingAssessment);
  }

  addAssessment() {
    this.newAssessment.week = this.selectedWeek;
    this.newAssessment.batch = this.selectedBatch;
    this.assessmentService.create(this.newAssessment);
  }

  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

  /****************************************************************************************
                                        SKILL
  *****************************************************************************************/

  /**
   * Called when a skill is changed. Sets the skill of the assessment being edited to the new skill.
   * @param selectSkill The html element that was changed.
   */
  editSkill(selectSkill: ElementRef) {
    const newSkill = $(selectSkill).find(':selected').val();
    this.editingAssessment.skill = this.findSkill(String(newSkill));
  }

  /**
   * Called when a skill is changed. Sets the skill of the new assessment to the new skill.
   * @param skillSelect The html element that was changed.
   */
  changeSkill(skillSelect: ElementRef) {
    const newSkill = $(skillSelect).find(':selected').val();
    this.newAssessment.skill = this.findSkill(String(newSkill));
  }

  /**
   * Finds the skill within this.skills.
   * @param name The name of the skill to find.
   * @returns the skill within this.skills.
   */
  findSkill(name: string): GambitSkill {
    return this.skills.find(skill => skill.skillName === name);
  }

/****************************************************************************************
                                      GRADES
*****************************************************************************************/

  updateGrade(trainee: HydraTrainee, assessment: Assessment, input) {
    const grade = this.getGrade(trainee, assessment);
    grade.score = Number(input.value);
    grade.dateReceived = '2000-01-01T01:01:01.000Z';
    this.updatingGrades.add(grade);
    this.gradeService.update(grade);
  }

  getGrade(trainee: HydraTrainee, assessment: Assessment) {
    const grade = new GradeByTraineeByAssessmentPipe().transform(this.grades, trainee, assessment)[0];

    if (grade != null) {
      return grade;
    } else {
      const tempGrade = new Grade();
      tempGrade.score = 0;
      tempGrade.assessment = assessment;
      tempGrade.trainee = trainee;
      return tempGrade;
    }
  }

  getPercentage(assessment: Assessment) {
    let sum = 0;
    this.assessments.forEach(a => {
      sum += a.rawScore;
    });

    return Math.round((assessment.rawScore / sum) * 100);
  }

  getOverallAverage() {
    let total = 0;

    this.assessments.forEach(a => {
      let sum = 0;
      const percentage = this.getPercentage(a);

      this.selectedBatch.trainees.forEach(trainee => {
        sum += (this.getGrade(trainee, a).score * percentage) / 100;
      });

      sum /= this.selectedBatch.trainees.length;
      total += sum;
    });

    return total;
  }

  getAssessmentAverage(assessment: Assessment) {
    let total = 0;

    this.selectedBatch.trainees.forEach(trainee => {
      total += this.getGrade(trainee, assessment).score;
    });

    return total / this.selectedBatch.trainees.length;
  }

/****************************************************************************************
                                      NOTES
*****************************************************************************************/

  getNote(trainee: HydraTrainee) {
    let note: Note;
    note = new NoteByTraineeByWeekPipe().transform(this.notes, trainee, this.selectedWeek);
    if (note.content === undefined) {
      note.content = '';
    }
    return note;
  }

  getWeekBatchNote(batch: CompleteBatch): Note {
    const n = this.notes.filter( (note) => {
      return (note.type === 'BATCH' && Number(note.week) === Number(this.selectedWeek));
    })[0];

    if (n != null) {
      if (n.content === undefined) {
        n.content = 'u';
      }
      return n;
    } else {
      const nNote = new Note();
      nNote.content = null;
      nNote.batch = this.selectedBatch;
      nNote.maxVisibility = '3';
      nNote.qcFeedback = false;
      nNote.week = this.selectedWeek;
      nNote.type = 'BATCH';
      return nNote;
    }
  }

  addWeekOfNotes(week: number) {
    this.selectedBatch.trainees.forEach(trainee => {
      const note = new Note();
      note.content = ' ';
      note.trainee = trainee;
      note.batch = this.selectedBatch;
      note.maxVisibility = '2';
      note.qcFeedback = false;
      note.week = week;
      note.type = 'TRAINEE';
      this.noteService.create(note);
    });
    const batchNote = new Note();
    batchNote.batch = this.selectedBatch;
    batchNote.maxVisibility = '3';
    batchNote.qcFeedback = false;
    batchNote.week = week;
    batchNote.type = 'BATCH';
    this.noteService.create(batchNote);
  }

  updateNote(note: Note, input) {
    note.content = input.value;
    note.batch = this.selectedBatch;
    this.noteService.update(note);
  }

/****************************************************************************************
                                      OTHER
*****************************************************************************************/

  open(content) {
    this.modalService.open(content);
  }

  addWeek() {
    this.addWeekOfNotes(this.selectedWeek);
    this.selectedWeek = this.batchUtil.getWeek(this.selectedBatch);
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
  }

  changeYear(year: number) {
    this.currentYear = Number(year);
  }

  changeBatch(batch: CompleteBatch) {
      this.selectedWeek = this.batchUtil.getWeek(batch);

    this.selectedBatch = batch;

    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);

    this.selectedTrainees = this.selectedBatch.trainees;
    this.selectedTrainees.sort((a, b) => {
      if (a.traineeUserInfo.firstName < b.traineeUserInfo.firstName) {
        return -1;
      } else if (a.traineeUserInfo.firstName > b.traineeUserInfo.firstName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  switchBatch(id: number) {
    this.batches.forEach(batch => {

      if (Number(batch.batchId) === Number(id)) {
        this.changeBatch(batch);
      }
    });
  }

  switchYear(year: number) {
    this.currentYear = year;
    this.yearBatches = [];
    const y = new Date(year, 0, 1);
    for (const batch of this.batches){
      const batchYear = new Date(batch.startDate);
      if (batchYear.getFullYear() === y.getFullYear()) {
        this.yearBatches[this.yearBatches.length] = batch;
      }
    }
    if (this.yearBatches[0] != null) {
      this.selectedWeek = this.batchUtil.getWeek(this.yearBatches[0]);
      this.switchBatch(this.yearBatches[0].batchId);

    }
  }

  counter(i: number) {
    return new Array(i);
  }

}

