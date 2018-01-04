import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Batch } from '../../entities/Batch';
import { NoteService } from '../../services/note.service';
import { Note } from '../../entities/Note';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quality-feedback',
  templateUrl: './quality-feedback.component.html',
  styleUrls: ['./quality-feedback.component.css']
})
export class QualityFeedbackComponent implements OnInit, OnDestroy {

  @Input() batch: Batch;  // property is going to RECEIVE input from outside
  QcTraineeNotes: Note[];
  QcTraineeNotesSubscription: Subscription;
  test: any;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.QcTraineeNotesSubscription = this.noteService.fetchQcTraineeNotesByBatchIdByWeek(2201, 5)
    .subscribe( (notes) => this.setQcTraineeNotes(notes));
  }

  ngOnDestroy() {
    this.QcTraineeNotesSubscription.unsubscribe();
  }

  setQcTraineeNotes(QcTraineeNotes) {
    this.QcTraineeNotes = QcTraineeNotes;
  }

  getBatchWeeks(): number[] {
    const batchWeeks: number[] = [];
    for (let i = 1; i < this.batch.weeks + 1; i++) {
      batchWeeks.push(i);
    }
    // console.log(this.batch.batchId);
    console.log(this.QcTraineeNotes);
    return batchWeeks;
  }

}
