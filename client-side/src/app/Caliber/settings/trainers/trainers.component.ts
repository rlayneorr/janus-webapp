import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../../entities/Trainer';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css',
    '../../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class TrainersComponent implements OnInit, OnDestroy {
  private trainerSubscription: Subscription;
  trainers: Trainer[];
  titles: Array<any>;
  tiers: Array<any>;

  currEditTrainer: Trainer;
  newTier: String;


  constructor(private trainerService: TrainerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.trainerSubscription = this.trainerService.trainers$.subscribe((resp) => {
      this.trainers = resp;
    });
    this.trainerSubscription = this.trainerService.titles$.subscribe((resp) => {
      this.titles = resp;
    });
    this.trainerSubscription = this.trainerService.tiers$.subscribe((resp) => {
      this.tiers = resp;
    });
  }

  // getAllTrainers() {
  //   this.trainerService.getAll();
  // }

  // getAllTitles() {
  //   this.trainerService.getTitles();
  // }



  //Open modal and get Trainer that belong to this modal
  editTrainer(content, modalTrainer: Trainer) {
    this.currEditTrainer = modalTrainer;
    this.modalService.open(content);

    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  tierChange(newTier)
  {
    this.newTier = newTier;
  }

  updateTrainer() {
    console.log('called update Trainer')
    this.currEditTrainer.tier = this.newTier;
    this.trainerService.updateTrainer(this.currEditTrainer);
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }















  // clean up subscriptions
  ngOnDestroy() {
    this.trainerSubscription.unsubscribe();
  }
}

