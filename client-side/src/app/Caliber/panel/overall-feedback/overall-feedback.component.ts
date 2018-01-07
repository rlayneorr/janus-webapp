import { Component, OnInit, OnDestroy, Input } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// entities
import { Note } from '../../entities/Note';

// services
import { QCStatusService } from '../../services/qcstatus.service';


@Component({
  selector: 'app-overall-feedback',
  templateUrl: './overall-feedback.component.html',
  styleUrls: ['./overall-feedback.component.css']
})
export class OverallFeedbackComponent implements OnInit, OnDestroy {
  @Input() batchNote: Note;
  private qcStatuses: string[];
  private qcStatusListSubscription: Subscription;

  constructor(
    private qcStatusService: QCStatusService
  ) { }

  /**
   * set the list of QC status values
   *
   * @param statuses
   */
  private setQCStatuses(statuses: string[]): void {
    this.qcStatuses = statuses;
  }


  ngOnInit() {
    this.qcStatusListSubscription = this.qcStatusService.getList()
      .subscribe( (list) => this.setQCStatuses(list) );
  }

  ngOnDestroy(): void {
    this.qcStatusListSubscription.unsubscribe();
  }

}
