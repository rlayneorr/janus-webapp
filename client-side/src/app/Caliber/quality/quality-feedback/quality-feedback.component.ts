import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Batch } from '../../entities/Batch';
import { NoteService } from '../../services/note.service';
import { Note } from '../../entities/Note';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quality-feedback',
  templateUrl: './quality-feedback.component.html',
  styleUrls: ['./quality-feedback.component.css']
})
export class QualityFeedbackComponent implements OnInit, OnDestroy, OnChanges {

  @Input() batch: Batch;
  qcBatchNote: Note[];
  qcTraineeNotes: Note[];
  notesSubscription: Subscription;
  week = 1;

  constructor(private noteService: NoteService) {
    this.notesSubscription = this.noteService.getList()
      .subscribe( (notes) => this.setNotes(notes) );
   }

  ngOnInit() {
    // this.fetchNotes();
  }

  ngOnDestroy() {
    this.notesSubscription.unsubscribe();
  }

  ngOnChanges() {
    this.fetchNotes();
  }

  setNotes(notes: Note[]): void {
    this.qcBatchNote = notes.filter(note => note.type === 'QC_BATCH');
    this.qcTraineeNotes = notes.filter(note => note.type === 'QC_TRAINEE');
    console.log(notes);
    console.log(this.qcBatchNote);
    console.log(this.qcTraineeNotes);
  }

  fetchNotes() {
    this.noteService.fetchByBatchIdByWeek(this.batch.batchId, this.week);
  }

  changeWeek(week: number) {
    this.week = week;
    this.fetchNotes();
  }

  getBatchWeeks(): number[] {
    const batchWeeks: number[] = [];
    for (let i = 1; i < this.batch.weeks + 1; i++) {
      batchWeeks.push(i);
    }
    return batchWeeks;
  }

  getNoteOnTrainee(index: number) {
    return this.qcTraineeNotes[index].content;
  }

  test() {
    console.log(this.batch.batchId);
    console.log(this.week);
    console.log(this.qcBatchNote);
    console.log(this.qcTraineeNotes[1].trainee.name);
  }

}
