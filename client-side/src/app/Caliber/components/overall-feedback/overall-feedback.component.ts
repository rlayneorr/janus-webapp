import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// services
import { EvaluationService } from '../../../services/evaluation.service';

// entities
import { Note } from '../../entities/Note';

@Component({
  selector: 'app-overall-feedback',
  templateUrl: './overall-feedback.component.html',
  styleUrls: ['./overall-feedback.component.css']
})

export class OverallFeedbackComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  private qcNotes: Array<Note> = null;
  private allNotes: Array<Note> = null;

  private traineeId = 5532;

  constructor(private service: EvaluationService) { }

  ngOnInit() {
    // Trainee QC subscription
    this.subscriptions.push(
      this.service.allQCTraineeOverallNotes$.subscribe((result) => {
        if (result) {
          this.qcNotes = result.data;
        } else {
          this.service.fetchAllQCTraineeOverallNotes(this.traineeId);
        }
      })
    );

    // Trainee Overall Subscription
    this.subscriptions.push(
      this.service.allTraineeNotes$.subscribe((result) => {
        if (result) {
          this.qcNotes = result.data;
        } else {
          this.service.fetchAllTraineeNotes(this.traineeId);
        }
      })
    );
  }

  ngOnDestroy() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
