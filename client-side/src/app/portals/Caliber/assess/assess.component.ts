import { Component, OnInit, NgModule, ViewEncapsulation, ElementRef } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BatchService } from '../services/batch.service';
import { HttpClientModule } from '@angular/common/http';
import { Batch } from '../entities/Batch';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Assessment } from '../entities/Assessment';
import { AssessmentService } from '../services/assessment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GradeService } from '../services/grade.service';
import { Grade } from '../entities/Grade';
import { Trainee } from '../entities/Trainee';
<<<<<<< HEAD
=======
import { SkillService } from '../services/skill.service';
import { Skill } from '../entities/Skill';
>>>>>>> feature-skill-refactor-categories
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
import { Skill } from '../entities/Skill';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe],
})
export class AssessComponent implements OnInit {
  assessment: Assessment;

  batches: Batch[] = [];
  assessments: Assessment[] = [];
  selectedBatch: Batch = new Batch();
  grades: Grade[] = [];
  updatingGrades: Set<Grade> = new Set<Grade>();
  selectedWeek: number;
<<<<<<< HEAD
  skills: Array<Skill>;
=======
  skills: Skill[] = [];
>>>>>>> feature-skill-refactor-categories
  notes: Note[] = [];
  rForm: FormGroup;

  newAssessment: Assessment = new Assessment();
  editingAssessment: Assessment = new Assessment();
  selectedAssessment: Assessment = new Assessment();

  years: Set<any> = new Set<any>();
  currentYear = 0;
  yearBatches: Batch[] = [];
  selectedTrainees: Trainee[] = [];

  pageOffsetValue;
<<<<<<< HEAD
  constructor(
    private batchService: BatchService, private assessmentService: AssessmentService,
    private gradeService: GradeService, private skillService: SkillService,
    private modalService: NgbModal, private noteService: NoteService,
    private fb: FormBuilder, private datePipe: DatePipe) { }
=======
  constructor(private modalService: NgbModal, private batchService: BatchService, private assessmentService: AssessmentService,
    private gradeService: GradeService, private skillService: SkillService, private noteService: NoteService,
    private fb: FormBuilder, private datePipe: DatePipe) {}
>>>>>>> feature-skill-refactor-categories

  getPageOffsetHeight(event: ScrollEvent) {
    this.pageOffsetValue = pageYOffset;
  }

  /**
   * This function is called when the user switches tabs from week to week.
   * @param event The event
   */
  fetchNews(event: any) {
    const id = event.nextId;

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

<<<<<<< HEAD
    this.skillService.fetchAllActive();
=======
    this.skillService.findAllActive();
>>>>>>> feature-skill-refactor-categories

    this.noteService.getList().subscribe(
      notes => { this.notes = notes; }
    );

    this.assessmentService.getList().subscribe(
      assessments => { this.assessments = assessments; }
    );

    this.gradeService.listSubject.subscribe(
      grades => { this.grades = grades; }
    );

    this.gradeService.saveSubject.subscribe(
      grade => {
        this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
      }
    );

    this.skillService.listSubject.subscribe(skills => {
      this.skills = skills;
<<<<<<< HEAD
=======
      this.newAssessment.skill = this.findSkill('Java');
>>>>>>> feature-skill-refactor-categories
    });

    this.batchService.getList().subscribe(
      batches => {
        this.batches = batches;

        if (this.batches.length !== 0) {
          // Set the year dropdown.
          this.batches.forEach(batch => {
            this.years.add(this.datePipe.transform(batch.startDate, 'yyyy'));
            const startDate = new Date(batch.startDate);
            if (startDate.getFullYear() > this.currentYear) {
              this.currentYear = startDate.getFullYear();
            }
          });

          this.switchYear(this.currentYear);
          this.changeBatch(this.yearBatches[0]);
          this.selectedWeek = this.selectedBatch.weeks;
        }
      }
    );

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

  /**
   * Opens the modal to edit an Assessment with and sets the current assessment being edited.
   */
  editAssessment(content, modalAssessment: Assessment) {
    this.editingAssessment = modalAssessment;
    this.modalService.open(content);
  }

  /**
   * Calls AssessmentService to update the assessment currently being edited.
   */
  updateAssessment() {
    this.assessmentService.update(this.editingAssessment);
  }

  /**
   * Calls AssessmentService to delete the assessment currently being edited and
   * removes that assessment from our array of assessments.
   */
  deleteAssessment() {
    this.assessments.forEach(assess => {
      if (assess.assessmentId === this.editingAssessment.assessmentId) {
        this.assessments.splice(this.assessments.indexOf(assess), 1);
      }
    });
    this.assessmentService.delete(this.editingAssessment);
  }

  /**
   * Calls AssessmentService to create an assessment with the week and batch pre-defined.
   */
  addAssessment() {
    this.newAssessment.week = this.selectedWeek;
    this.newAssessment.batch = this.selectedBatch;
    this.assessmentService.create(this.newAssessment);
  }

  /**
   * Gets the Assessment for the selected Batch at the specified week.
   * @param week The week number.
   */
  getAssessments(week: number) {
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, week);
  }

<<<<<<< HEAD
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
  findSkill(name: string): Skill {
    return this.skills.find(skill => skill.skillName === name);
=======
/****************************************************************************************
                                      CATEGORIES
*****************************************************************************************/

  editSkill(skillSelect: ElementRef) {
    const newSkill = $(skillSelect).find(':selected').val();
    this.editingAssessment.skill = this.findSkill(newSkill);
  }

  changeSkill(skillSelect: ElementRef) {
    const newSkill = $(skillSelect).find(':selected').val();
    this.newAssessment.skill = this.findSkill(newSkill);
  }

  findSkill(skill: any): Skill {
    let matchingSkill;
    this.skills.forEach(element => {

      if (element.skillName === skill) {
        matchingSkill = element;
      }
    });

    return matchingSkill;
>>>>>>> feature-skill-refactor-categories
  }
  /****************************************************************************************
                                        GRADES
  *****************************************************************************************/

  /**
   * Called when user hits enter in the Grade Score Input element
   * @param trainee The trainee whose assessment is being updated
   * @param assessment The assessment whose grade is being updated
   * @param input The id of the Grade Score Input element
   */
  updateGrade(trainee: Trainee, assessment: Assessment, input: any) {
    const grade = this.getGrade(trainee, assessment);
    grade.score = Number(input.value);
    grade.dateReceived = '2000-01-01T01:01:01.000Z';
    this.updatingGrades.add(grade);
    this.gradeService.update(grade);
  }

  /**
   * Displays the trainee's grade for the specified assessment in the Grade Score Input element
   * @param trainee The trainee whose assessment is being viewed
   * @param assessment The assessment whose grade is being displayed
   */
  getGrade(trainee: Trainee, assessment: Assessment) {
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

  /**
   * Compares the assessment's rawScore with the sum of the trainee's other assessments.
   * Shown in the assessment header.
   * @param assessment the assessment whose score you want to care.
   * @returns assessment.rawScore / sumAll(this.assessment.rawScore) * 100.
   */
  getPercentage(assessment: Assessment) {
    let sum = 0;
    this.assessments.forEach(
      assess => { sum += assess.rawScore; }
    );

    return Math.round((assessment.rawScore / sum) * 100);
  }

  /**
   * Compares the assessment's rawScore to every assessment by every trainee.
   * @returns the weekly batch average.
   */
  getOverallAverage(): number {
    let total = 0;

    this.assessments.forEach(assessment => {
      let sum = 0;
      const percentage = this.getPercentage(assessment);

      this.selectedBatch.trainees.forEach(trainee => {
        sum += (this.getGrade(trainee, assessment).score * percentage) / 100;
      });

      sum /= this.selectedBatch.trainees.length;
      total += sum;
    });

    return total;
  }

  /**
   * Gets the batch average of the specified assessment.
   * @param assessment The assessment to average
   * @returns sum of trainee's scores divided by the number of trainees
   */
  getAssessmentAverage(assessment: Assessment): number {
    let total = 0;

    this.selectedBatch.trainees.forEach(trainee => {
      total += this.getGrade(trainee, assessment).score;
    });

    return total / this.selectedBatch.trainees.length;
  }

  /****************************************************************************************
                                        NOTES
  *****************************************************************************************/

  /**
   * @param trainee The trainee whose note you want to read.
   * @returns The content of the note on the specified trainee at the selected week.
   */
  getNote(trainee: Trainee): Note {
    let note: Note;
    note = new NoteByTraineeByWeekPipe().transform(this.notes, trainee, this.selectedWeek);
    if (note.content === undefined) {
      note.content = '';
    }
    return note;
  }

  /**
   * @param batch The batch whose note you want to read
   * @returns A new note if the note does not exist, or the note itself.
   */
  getWeekBatchNote(batch: Batch): Note {
    // Batch note is the first note in notes[]
    const n = this.notes.filter((note) => {
      return (note.type === 'BATCH' && note.week === this.selectedWeek);
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

  /**
   * Initializes a note for every trainee and the batch for the specified week.
   * @param week The week number.
   */
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

  /**
   * Updates the note content with the value of the textarea element.
   * @param note The note to update.
   * @param input The textarea element.
   */
  updateNote(note: Note, input: any) {
    note.content = input.value;
    note.batch = this.selectedBatch;
    this.noteService.update(note);
  }

  /****************************************************************************************
                                        OTHER
  *****************************************************************************************/

  /**
   * Opens the specified modal.
   * @param content The id of the modal to open.
   */
  open(content: any) {
    this.modalService.open(content);
  }

  /**
   * Used in the Add Week Modal. Adding a week to the selected Batch:
   * - Initializes a note for every trainee and the batch
   * - Updates the Batch in the database
   * - Selects the new week
   * - Retrieves all assessments, grades, and notes for the selected week.
   */
  addWeek() {
    this.selectedBatch.weeks += 1;
    this.addWeekOfNotes(this.selectedBatch.weeks);
    this.batchService.update(this.selectedBatch);
    this.selectedWeek = this.selectedBatch.weeks;
    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
  }

  /**
   * Ordinary setter function. Should be named setYear()
   */
  changeYear(year: number) {
    this.currentYear = year;
  }

  /**
   * Called when the user selects a Batch from the unnamed dropdown menu.
   * Sets our selected variables to display the selected Batch's variables
   * and sorts the Trainee list by name.
   * @param batch The Batch to change to.
   */
  changeBatch(batch: Batch) {
    this.selectedWeek = batch.weeks;

    this.selectedBatch = batch;

    this.assessmentService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.gradeService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);
    this.noteService.fetchByBatchIdByWeek(this.selectedBatch.batchId, this.selectedWeek);

    this.selectedTrainees = this.selectedBatch.trainees;
    this.selectedTrainees.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  /**
   * Only calls changeBatch()
   * @deprecated Use changeBatch(Batch) instead.
   * @param id The id of the Batch to switch to.
   */
  switchBatch(id: number) {
    this.batches.forEach(batch => {

      if (batch.batchId === id) {
        this.changeBatch(batch);
      }
    });
  }

  /**
   * Called from the dropdown menu. Allows the user to view batches from a different year.
   * @param year The year to switch to.
   */
  switchYear(year: number) {
    this.currentYear = year;
    this.yearBatches = [];
    const y = new Date(year, 0, 1);

    for (const batch of this.batches) {
      const batchYear = new Date(batch.startDate);
      if (batchYear.getFullYear() === y.getFullYear()) {
        this.yearBatches[this.yearBatches.length] = batch;
      }
    }
    if (this.yearBatches[0] != null) {
      this.selectedWeek = this.yearBatches[0].weeks;
      this.switchBatch(this.yearBatches[0].batchId);
    }
  }

  /**
   * This is being used to display numbered tabs. Not the most elegant solution...
   * Only used to call: let i = index; in an *ngFor
   * @param i The length of the array.
   */
  counter(i: number): Array<any> {
    return new Array(i);
  }

}
