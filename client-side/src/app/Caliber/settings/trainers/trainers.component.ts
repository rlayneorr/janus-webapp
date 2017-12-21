import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../../entities/Trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css',
    '../../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class TrainersComponent implements OnInit, OnDestroy {
  private trainerSubscription: Subscription;
  trainers: Trainer[];
  currEditTrainerIndex: number;
  

  constructor(private trainerService: TrainerService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.trainerSubscription = this.trainerService.trainers$.subscribe((resp) => {
      this.trainers = resp;
    });
  }

  getAllTrainers() {
    this.trainerService.getAll();
  }



  //Open modal and get Trainer that belong to this modal
  editTrainer(content, index: number) {
    this.currEditTrainerIndex = index;
    this.modalService.open(content);

    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
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

