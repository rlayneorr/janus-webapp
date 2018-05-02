import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainerService } from '../../../hydra-client/services/trainer/trainer.service';
import { BatchService } from '../../../hydra-client/aggregator/services/completebatch.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

<<<<<<< HEAD
<<<<<<< HEAD
  constructor() {}

  ngOnInit() {}
=======
  constructor(private trainerService: TrainerService) { }
=======
  constructor(private trainerService: TrainerService, private completeBatchService: BatchService) { }
>>>>>>> a75eb6877589cf2ca0720eac1609d1725b5c3d02


  ngOnInit() {
    this.trainerService.fetchAll().subscribe(x => {
      console.log(x);
    });
    this.completeBatchService.fetchAll();
  }
>>>>>>> d8c3d5c1937a9c819ceb5d99385bbaa28fd6c589


  ngOnDestroy() {}
}
