import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { BatchService } from '../../../Caliber/services/batch.service';
import { Batch } from '../../entities/Batch';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../entities/Trainer';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  // http://localhost:8080/vp/batch/all
  @ViewChild('startDate') year;

  private batchService: BatchService;
  private trainerService: TrainerService;

  batchList: Array<Batch>;
  trainerList: Array<Trainer>;
  yearList;
  batchSelect: Object = {};
  weekSelect: Object = {};
  yearSelect: Object = {};
  traineeSelect: Object = {};
  private batchSubscription: Subscription;
  private trainerSubscription: Subscription;

  constructor(batchService: BatchService, trainerService: TrainerService) {
    this.batchService = batchService;
    this.trainerService = trainerService;

    this.batchSubscription = new Subscription();
    this.trainerSubscription = new Subscription();
  }

  ngOnInit() {
    this.batchService.fetchAll();
    this.batchSubscription = this.batchService.getList().subscribe((batches) => {
        if (batches.length > 0) {
          this.batchList = batches;
          this.createYearList();
          this.year = this.year.nativeElement;
          this.filterByBatch(2201);
        }
      });
    }

    filterByBatch(batchNum) {

    }

    yearChange(year): boolean {
      if (year === new Date().getFullYear()) {
        return true;
      }
    }

    yearOnChange() {
      console.log(this.year.value);
    }

    /**
     * Creates an array of all the batch years without duplicates.
     */
    createYearList(): void {
      // create Set
      this.yearList = new Set();

      // Add current year and next year
      this.yearList.add(new Date().getFullYear());
      this.yearList.add(new Date().getFullYear() + 1);

      // Add all batch years to Set. It will not allow duplicates
      for (const date of this.batchList) {
        this.yearList.add(date.startDate.toString().substring(0, 4));
      }

      // Converts Set to an Array
      this.yearList = Array.from(this.yearList);

      // Sort the array
      this.yearList.sort(function(a, b) {
        return b - a;
      });
    }

    public debug(): void {
      // console.log(this.batchList[0].startDate.toString().substr(0, 4));
      console.log(this.year.value);
    }

    public cleanBatchList(): void {
      for (let i = 0; i < this.batchList.length; i++) {
        if (this.batchList[i].startDate.toString().substr(0, 4) === this.batchList[i + 1].startDate.toString().substr(0, 4)) {
          this.batchList.splice(i + 1, 1);
        }
      }
    }

    ngOnDestroy() {
      this.batchSubscription.unsubscribe();
      this.trainerSubscription.unsubscribe();
    }
}

