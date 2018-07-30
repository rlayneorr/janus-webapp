import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainerService} from '../../../caliber-client/services/trainer/trainer.service';
import {BatchService} from '../../../caliber-client/aggregator/services/completebatch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private trainerService: TrainerService, private completeBatchService: BatchService) { }

  ngOnInit() {
    this.trainerService.fetchAll().subscribe(x => {
      console.log(x);
    });
    this.completeBatchService.fetchAll();
  }


  ngOnDestroy() {}
}
