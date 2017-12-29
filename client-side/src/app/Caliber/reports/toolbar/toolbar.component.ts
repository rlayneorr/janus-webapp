import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

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

  private batchService: BatchService;
  private trainerService: TrainerService;

  batchList: Array<Batch>;
  trainerList: Array<Trainer>;
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
    this.batchSubscription = this.batchService.getList().subscribe((batchList) => {
      this.batchList = batchList;
    });

    this.batchService.fetchAll();
    }

    public debug(): void {
      console.log(this.batchList[0].startDate.toString().substr(0, 4));
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

