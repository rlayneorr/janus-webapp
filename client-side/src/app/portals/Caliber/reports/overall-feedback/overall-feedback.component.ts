import { Component, OnInit, SimpleChanges, OnDestroy } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// services
import { ReportingService } from '../../services/reporting.service';
import { GranularityService } from '../services/granularity.service';
import { NoteService } from '../../services/note.service';
import { GambitBatchService } from '../../../../gambit-client/services/batch/gambit-batch.service';

// entities
import { Note } from '../../entities/Note';
import { CompleteBatch } from '../../../../gambit-client/aggregator/entities/CompleteBatch';
import { GambitBatchUtilService } from '../../../../services/gambit-batch-util.service';
import { GambitTrainee } from '../../../../gambit-client/entities/GambitTrainee';

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

  private granularitySubscription: Subscription;
  private noteSubscription: Subscription;
  private topicSubscription: Subscription;

  qcNotes: Array<Note> = null;
  traineeNotes: Array<Note> = null;
  weekTopics: Array<Array<string>>;

  trainee: GambitTrainee;
  week = 1;
  batch: CompleteBatch;

  constructor(private granularityService: GranularityService,
    private noteService: NoteService,
    private reportService: ReportingService,
    private batchService: GambitBatchService,
    private batchUtil: GambitBatchUtilService) { }

  ngOnInit() {

    this.granularitySubscription = Observable.combineLatest(
      this.granularityService.currentBatch$, this.granularityService.currentTrainee$,
      this.granularityService.currentWeek$).subscribe((batchTraineeWeek) => {

        this.batch = batchTraineeWeek[0];
        this.trainee = batchTraineeWeek[1];
        this.week = batchTraineeWeek[2];

        if (this.trainee.traineeId > 0) {
          this.noteService.fetchByTrainee(this.trainee);
          // Change GambitBatchUtilService, so it accepts CompleteBatch objects
          this.reportService.fetchTechnologiesUpToWeek(this.batch.batchId, this.batchUtil.getWeek(this.batch));
        }
      });

    this.noteSubscription = this.noteService.getTraineeList().subscribe((list) => {
      this.traineeNotes = list.filter(note => note.type === 'TRAINEE');
      this.qcNotes = list.filter(note => note.type === 'QC_TRAINEE');
    });

    this.topicSubscription = this.reportService.technologiesUpToWeek$.subscribe((result) => {
      if (result) {
        this.weekTopics = result.data;
      }
    });
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

  traineeWeek(week: Number): Note {
    return this.getNoteByWeek(this.traineeNotes, week);
  }

  ngOnDestroy() {
    this.granularitySubscription.unsubscribe();
    this.noteSubscription.unsubscribe();
    this.topicSubscription.unsubscribe();
  }

}
