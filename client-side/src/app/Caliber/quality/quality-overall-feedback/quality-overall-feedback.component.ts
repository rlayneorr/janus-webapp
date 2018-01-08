import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// entities
import { Note } from '../../entities/Note';

// services
import { QCStatusService } from '../../services/qcstatus.service';


@Component({
  selector: 'app-quality-overall-feedback',
  templateUrl: './quality-overall-feedback.component.html',
  styleUrls: ['./quality-overall-feedback.component.css']
})
export class QualityOverallFeedbackComponent implements OnInit, OnDestroy, OnChanges {
  @Input() batchNote: Note;

  public qcStatuses: string[];
  public selectedStatus: string;

  private qcStatusListSubscription: Subscription;

  constructor(
    private qcStatusService: QCStatusService
  ) {
    this.selectedStatus = Note.STATUS_UNDEFINED;
  }

  /**
   * set the list of QC status values
   *
   * @param statuses
   */
  private setQCStatuses(statuses: string[]): void {
    this.qcStatuses = statuses;
    console.log(this.batchNote);
  }

  /**
  * steps to perform when the qcStatus value
  * is changed by the user
  */
  private onStatusChange() {
    if ( this.batchNote ) {
      this.selectedStatus = this.batchNote.qcStatus;
    }
  }

  /**
  * push the value selected by the user
  * into the batchNote object represented
  */
  public setNoteStatus(status: string) {
    if ( this.batchNote ) {
      this.batchNote.qcStatus = status;
      this.onStatusChange();
    }
  }

  ngOnInit() {
    this.qcStatusListSubscription = this.qcStatusService.getList()
      .subscribe((list) => this.setQCStatuses(list));
  }

  ngOnChanges(): void {
    this.onStatusChange();
  }

  ngOnDestroy(): void {
    this.qcStatusListSubscription.unsubscribe();
  }

}
