import { Component, OnInit, OnDestroy } from '@angular/core';
import { Batch } from '../entities/Batch';
import { NoteService } from '../services/note.service';
import { BatchService } from '../services/batch.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.css']
})
export class QualityComponent implements OnInit, OnDestroy {

  batches: Batch[];

  currentBatch: Batch = new Batch();
  currentYear: number;

  batchSubscription: Subscription;


  constructor(private batchService: BatchService) {
    this.setCurrentYear(2018);
  }

  ngOnInit() {
    this.batchService.fetchAll();
    this.batchSubscription = this.batchService.getList()
      .subscribe( (batches) => this.setBatches(batches) );
   }

   ngOnDestroy() {
    this.batchSubscription.unsubscribe();
   }

   private setBatches(batches: Batch[]): void {
    this.batches = batches;
    this.currentBatch = this.batches[0];
   }

   public setCurrentYear(currentYear: number): void {
     this.currentYear = currentYear;
     console.log(currentYear);
   }

   getTrackedYears(): number[] {
     const thisYear: number = new Date().getFullYear();
     const trackedYears = [];

     for (let i = 0; i < 3; i++) {
       trackedYears.push(thisYear - i);
     }
     // console.log(trackedYears);
     return trackedYears;
   }

   onBatchSelect(batchId: number) {
    console.log(batchId);
    for (let i = 0; i < this.batches.length; i++) {
      if (batchId == this.batches[i].batchId) {
        this.currentBatch = this.batches[i];
      }
    }
  }

}
