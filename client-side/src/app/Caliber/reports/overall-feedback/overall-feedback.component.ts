import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// services
import { EvaluationService } from '../../../services/evaluation.service';
import { ReportingService } from '../../../services/reporting.service';
import { GranularityService } from '../services/granularity.service';

// entities
import { Note } from '../../entities/Note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/**
 * Creates a table of the overall feedback of a given trainee in a given batch.
 *
 * @author Micah West
 * Requests made:
 * Batch's Week-to-week topics (reporting service)
 * QC Notes on a given trainee
 * Trainer notes on a given trainee
 */

@Component({
  selector: 'app-overall-feedback',
  templateUrl: './overall-feedback.component.html',
  styleUrls: ['./overall-feedback.component.css']
})

export class OverallFeedbackComponent implements OnInit, OnDestroy {

  qcNotes: Array<Note> = null;
  allNotes: Array<Note> = null;
  private qcNoteSubscription: Subscription;
  private allNoteSubscription: Subscription;

  private weekSubscription: Subscription;
  private weekTopics: Array<Array<String>>;

  // These should be filled in by subjects.
  private traineeSubscription: Subscription;
  private batchSubscription: Subscription;

  constructor(private granularityService: GranularityService,
              private evalService: EvaluationService,
              private reportService: ReportingService) { }

  ngOnInit() {

    this.traineeSubscription = this.granularityService.currentTrainee$.subscribe((trainee) => {

      if (trainee) {
        const traineeId = trainee.traineeId;

        // Trainee QC Subscription
        if (this.qcNoteSubscription) { this.qcNoteSubscription.unsubscribe(); }
        this.qcNoteSubscription = this.evalService.allQCTraineeOverallNotes$.subscribe((result) => {
          if (result) {
            this.qcNotes = result.data;
          } else {
            this.evalService.fetchAllQCTraineeOverallNotes(traineeId);
          }
        });

        // Trainee Overall Subscription
        if (this.allNoteSubscription) { this.allNoteSubscription.unsubscribe(); }
        this.allNoteSubscription = this.evalService.allTraineeNotes$.subscribe((result) => {
          if (result) {
            this.allNotes = result.data;
          } else {
            this.evalService.fetchAllTraineeNotes(traineeId);
          }
        });
      }
    });

    this.batchSubscription = this.granularityService.currentBatch$.subscribe((batch) => {

      if (this.weekSubscription) { this.weekSubscription.unsubscribe(); }
      this.weekSubscription = this.reportService.technologiesUpToWeek$.subscribe((result) => {
        if (result) {
          this.weekTopics = result.data;
        } else {
          this.reportService.fetchTechnologiesUpToWeek(batch.batchId, batch.gradedWeeks);
        }
      });
    });
  }

  weekArray(notes: Array<Note>): Array<Number> {
    const result = Array<Number>();

    for (const note of notes) {
      result.push(note.week);
    }

    return result;
  }

  getNoteByWeek(notes: Array<Note>, week: Number): Note {
    let result: Note = null;

    for (const note of notes) {
      if (!result && note.week === week) {
        result = note;
      }
    }

    return result;
  }

  qcWeek(week: Number): Note {
    return this.getNoteByWeek(this.qcNotes, week);
  }

  allWeek(week: Number): Note {
    return this.getNoteByWeek(this.allNotes, week);
  }

  ngOnDestroy() {
    this.weekSubscription.unsubscribe();
    this.qcNoteSubscription.unsubscribe();
    this.allNoteSubscription.unsubscribe();
    this.traineeSubscription.unsubscribe();
    this.batchSubscription.unsubscribe();
  }

}
