import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Subscription } from 'rxjs/Subscription';

// pipes
import { DisplayBatchByYear } from '../pipes/display-batch-by-year.pipe';
// import { BatchGambit } from '../../../gambit-client/entities/BatchGambit';
import { BatchService } from '../../../gambit-client/aggregator/services/completebatch.service';
import { CompleteBatch } from '../../../gambit-client/aggregator/entities/CompleteBatch';


@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css'],
  providers: [DisplayBatchByYear],
})

export class QualityComponent implements OnInit, OnDestroy {

  batches: CompleteBatch[] = [];

  currentBatch: CompleteBatch;
  currentYear: number;

  batchSubscription: Subscription;


  constructor(
    private batchService: BatchService,
    private batchesByYearPipe: DisplayBatchByYear
  ) {
    this.setCurrentYear(this.getCalendarYear());
    this.currentBatch = new CompleteBatch();
  }

  ngOnInit() {
    this.batchSubscription = this.batchService.fetchAll()
      .subscribe((batches) => this.setBatches(batches));

    this.batchService.fetchAll();
  }

  ngOnDestroy() {
    this.batchSubscription.unsubscribe();
  }

  /**
  * sets the batch list
  *
  * @param batches: Batch[]
  */
  private setBatches(batches: CompleteBatch[]): void {
    this.batches = batches;
  }


  public onYearSelect(year: number) {
    const currentYearBatches: CompleteBatch[] = this.batchesByYearPipe.transform(this.batches, year);
    this.setCurrentYear(year);

    if (currentYearBatches.length > 0) {
      this.currentBatch = currentYearBatches[0];
    } else {
      this.currentBatch = null;
    }

  }

  /**
  * returns the current calendar year
  *
  * @return number
  */
  private getCalendarYear(): number {
    return new Date().getFullYear();
  }

  /**
  * sets the current year for the component
  *
  * @param year: number(
  */
  public setCurrentYear(year: number): void {
    this.currentYear = year;

    // console.log(currentYear);
  }

  public getBatchesOfCurrentYear(): CompleteBatch[] {
    return this.batchesByYearPipe.transform(this.batches, this.currentYear);
  }

  getTrackedYears(): number[] {
    const thisYear: number = this.getCalendarYear();
    const trackedYears = [];

    for (let i = 0; i < 3; i++) {
      trackedYears.push(thisYear - i);
    }
    // console.log(trackedYears);
    return trackedYears;
  }

  onBatchSelect(batchId: number) {
    // console.log(batchId)f;
    const selectedBatches = this.batches.filter((batch) => (Number(batch.batchId) === Number(batchId)));

    if (selectedBatches.length === 1) {
      this.currentBatch = selectedBatches[0];
    }

  }

}
