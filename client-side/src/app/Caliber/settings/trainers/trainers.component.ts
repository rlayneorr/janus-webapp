import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { TrainerService } from '../../services/trainer.service';
import { Subscription } from 'rxjs/Subscription';
import { Trainer } from '../../../entities/Trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})

export class TrainersComponent implements OnInit, OnDestroy {
  private trainerSubscription: Subscription;
  trainers: Trainer[];

  constructor(private trainerService: TrainerService) { }

  ngOnInit() {
    this.trainerSubscription = this.trainerService.trainers$.subscribe( (resp) => {
      this.trainers = resp;
      console.log(this.trainers);
    });
  }

  ngOnDestroy() {
    this.trainerSubscription.unsubscribe();
  }
}
