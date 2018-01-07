import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Batch } from '../../entities/Batch';
import { NoteService } from '../../services/note.service';
import { Note } from '../../entities/Note';
import { Subscription } from 'rxjs/Subscription';
import { Trainee } from '../../entities/Trainee';
import { QCStatusService } from '../../services/qcstatus.service';

@Component({
  selector: 'app-quality-feedback',
  templateUrl: './quality-feedback.component.html',
  styleUrls: ['./quality-feedback.component.css']
})
export class QualityFeedbackComponent implements OnInit, OnDestroy, OnChanges {

  @Input() batch: Batch;
  qcBatchNotes: Note[];
  qcTraineeNotes: Note[];

  notesSubscription: Subscription;
  qcStatusSubscription: Subscription;

  qcStatuses: string[];

  week = 1;

  constructor(private noteService: NoteService, private qcStatusService: QCStatusService) {
    this.qcTraineeNotes = [];
    this.qcStatuses = [];
   }

  ngOnInit() {
    this.qcStatusSubscription = this.qcStatusService.getList()
      .subscribe( (statuses) => this.setQcStatuses(statuses) );

    this.notesSubscription = this.noteService.getList()
      .subscribe( (notes) => this.setNotes(notes) );

  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
    this.qcStatusSubscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.batch) {
      this.fetchNotes();
    }
  }

  getQcBatchNote(): Note {
    let note: Note;

    if ( this.qcBatchNotes.length === 1 ) {
      note = this.qcBatchNotes[0];
    } else {
      note = {
        noteId: 0,
        type: Note.TYPE_QCBATCH,
        qcStatus: Note.STATUS_UNDEFINED,
        qcFeedback: true,
        content: '',
        week: this.week,
        batch: this.batch,
        trainee: null,
        maxVisibility: 'ROLE_PANEL',
      };
    }

    return note;
  }

  setNotes(notes: Note[]): void {
    this.qcBatchNotes = notes.filter(note => note.type === 'QC_BATCH');
    this.qcTraineeNotes = notes.filter(note => note.type === 'QC_TRAINEE');
    // console.log(notes);
    console.log(this.qcBatchNotes);
    console.log(this.qcTraineeNotes);
  }

  setQcStatuses(statuses: string[]) {
    this.qcStatuses = statuses;
    console.log(statuses);
  }

  fetchNotes() {
    this.noteService.fetchByBatchIdByWeek(this.batch.batchId, this.week);
  }

  getBatchWeeks(): number[] {
    const batchWeeks: number[] = [];
    for (let i = 1; i < this.batch.weeks + 1; i++) {
      batchWeeks.push(i);
    }
    return batchWeeks;
  }

  getNoteOnTrainee(trainee: Trainee) {
    let traineeNote = '';
    for (let i = 0; i < this.qcTraineeNotes.length; i++) {
      if (trainee.traineeId === this.qcTraineeNotes[i].trainee.traineeId) {
        traineeNote = this.qcTraineeNotes[i].content;
      }
    }
    // console.log(traineeNote);
    return traineeNote;
  }

  getQcStatusOnTrainee(trainee: Trainee) {
    let traineeQcStatus = '';
    for (let i = 0; i < this.qcTraineeNotes.length; i++) {
      if (trainee.traineeId === this.qcTraineeNotes[i].trainee.traineeId) {
        traineeQcStatus = this.qcTraineeNotes[i].qcStatus;
      }
    }
    // console.log(traineeQcStatus);
    return traineeQcStatus;
  }

  updateQcStatusOnTraineeNote(trainee: Trainee) {
    // tslint:disable-next-line:prefer-const
    let currentTraineeStatus = this.getQcStatusOnTrainee(trainee);
    const currentTraineeNote = this.getNoteOnTrainee(trainee);

    

  }

  changeWeek(week: number) {
    this.week = week;
    this.fetchNotes();
  }

  // test() {
  //   console.log(this.batch.batchId);
  //   console.log(this.week);
  //   console.log(this.qcBatchNote);
  //   console.log(this.qcTraineeNotes[1].trainee.name);

  // }

}
