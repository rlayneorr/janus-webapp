import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// services
import { NoteService } from '../../services/note.service';
import { QCStatusService } from '../../services/qcstatus.service';
import { BatchService } from '../../services/batch.service';

// entities
import { Batch } from '../../entities/Batch';
import { Note } from '../../entities/Note';
import { Trainee } from '../../entities/Trainee';



@Component({
  selector: 'app-quality-feedback',
  templateUrl: './quality-feedback.component.html',
  styleUrls: ['./quality-feedback.component.css']
})

export class QualityFeedbackComponent implements OnInit, OnDestroy, OnChanges {

  @Input() batch: Batch;

  public statusList: string[];
  public notes: Note[];
  public week: number;

  private qcStatusSubscription: Subscription;
  private noteListSubscription: Subscription;

  constructor(
    private noteService: NoteService,
    private qcStatusService: QCStatusService,
    private batchService: BatchService
  ) {

    this.week = 1;
  }


  /**
  * filters the list passed to return only the
  * QC Trainee notes
  *
  * @param notes: Note[]
  *
  * @return Note[]
  */
  public getTraineeNotes(notes: Note[]): Note[] {
    return notes.filter( (note) => ( note.type === Note.TYPE_QCTRAINEE ) );
  }

  /**
  * set the list of possible statuses
  */
  private setStatusList(data: string[]): void {
   this.statusList = data;
  }

  /**
  * set the list of notes
  */
  private setNoteList(notes: Note[] ): void {
    this.notes = notes;
  }

  /**
  * trigger the NoteService to retrieve
  * all notes
  */
  private fetchNotes(): void {
    this.noteService.fetchByBatchIdByWeek(this.batch.batchId, this.week);
  }

  /**
  * factory method for creating a new instance
  * of a note object
  *
  * @param type: string
  * @param isQcFeedback: boolean
  */
  private createNote(type: string, isQcFeedback = true): Note {
    return {
        noteId: 0,
        type: type,
        qcStatus: Note.STATUS_UNDEFINED,
        qcFeedback: isQcFeedback,
        content: '',
        week: this.week,
        batch: this.batch,
        trainee: null,
        maxVisibility: 'ROLE_PANEL',
    };
  }



  ngOnInit(): void {
    this.qcStatusSubscription = this.qcStatusService.getList()
      .subscribe( (data) => this.setStatusList(data) );

    this.noteListSubscription = this.noteService.getList()
      .subscribe( (notes) => {
        console.log(notes);
        this.setNoteList(notes);
      });
  }

  ngOnDestroy(): void {
    this.noteListSubscription.unsubscribe();
    this.qcStatusSubscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.batch.batchId ) {
      this.fetchNotes();
    }
  }

  getQcBatchNote(): Note {
    let note: Note;

    // console.log(this.qcBatchNotes);

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
    this.qcTraineeNotes = notes.filter(note => (note.type === Note.TYPE_TRAINEE) );
    this.qcBatchNotes = notes.filter(note => (note.type === Note.TYPE_QCBATCH) );
     console.log(notes);
    this.addMissingNotes();

     // console.log(notes);

    this.buildStatusMap();

    // console.log(notes);
    // console.log(this.statusMap);

    // console.log(notes);
    // console.log(this.qcBatchNotes);
    // console.log(this.qcTraineeNotes);
  }

  buildStatusMap(): void {
    this.statusMap = {};

    for (const note of this.qcTraineeNotes) {
      this.statusMap[note.trainee.traineeId] = note.qcStatus;
    }
    // console.log(this.qcTraineeNotes);
  }

  setQcStatuses(statuses: string[]) {
    this.qcStatuses = statuses;
    // console.log(statuses);
  }


  getBatchWeeks(): number[] {
    const batchWeeks: number[] = [];
    for (let i = 1; i < this.batch.weeks + 1; i++) {
      batchWeeks.push(i);
    }
    return batchWeeks;
  }

  changeWeek(week: number) {
    this.week = week;
    this.fetchNotes();
    this.createNewTraineeNotesForNewWeek();
  }

  addWeekToBatch() {
    this.batch.weeks += 1;
    // this.createNewTraineeNotesForNewWeek();
    this.batchService.update(this.batch);
  }

  private addMissingNotes(): void {
    // console.log(this.batch);

    if ( this.batch.trainees ) {
      for ( let i = 0; i < this.batch.trainees.length; i++ ) {
        const trainee = this.batch.trainees[i];
        const traineeNote = this.getNoteOnTrainee(trainee);
        if (traineeNote === null) {
          this.qcTraineeNotes.push({
            noteId: 0,
            type: Note.TYPE_QCTRAINEE,
            qcStatus: Note.STATUS_UNDEFINED,
            qcFeedback: true,
            content: '',
            week: this.week,
            batch: this.batch,
            trainee: trainee,
            maxVisibility: 'ROLE_PANEL',
          });
        }
        // console.log(i);
      }
    }

  }

  getNoteOnTrainee(trainee: Trainee) {
    let traineeNote = null;
    for (let i = 0; i < this.qcTraineeNotes.length; i++) {
      if (trainee.traineeId === this.qcTraineeNotes[i].trainee.traineeId) {
        traineeNote = this.qcTraineeNotes[i];
        break;
      }
    }
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

  updateQcStatusOnTraineeNote(status: string, trainee: Trainee) {
    const traineeNote = this.getNoteOnTrainee(trainee);
    traineeNote.qcStatus = status;
    this.statusMap[trainee.traineeId] = status;
    this.noteService.update(traineeNote);
  }

  updateTraineeNoteContent(noteContent: string, trainee: Trainee) {
    const traineeNote = this.getNoteOnTrainee(trainee);
    traineeNote.content = noteContent;
    this.noteService.update(traineeNote);
    // console.log(traineeNote);
    // console.log(traineeNote.content);
    // this.fetchNotes();
  }

  createNewTraineeNotesForNewWeek() {
    console.log('in createNewTraineeNotesForNewWeek');
    for ( let i = 0; i < this.batch.trainees.length; i++ ) {
      const trainee = this.batch.trainees[i];
      const traineeNote = this.getNoteOnTrainee(trainee);
      if (traineeNote === null) {
        this.qcTraineeNotes.push({
          noteId: 0,
          type: Note.TYPE_QCTRAINEE,
          qcStatus: Note.STATUS_UNDEFINED,
          qcFeedback: true,
          content: '',
          week: this.week,
          batch: this.batch,
          trainee: trainee,
          maxVisibility: 'ROLE_PANEL',
        });
      }
    }
  }

}
