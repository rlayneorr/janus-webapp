import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainerService } from '../../services/trainer.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Trainer } from '../../../entities/Trainer';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css',
    '../../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class TrainersComponent implements OnInit, OnDestroy {
  private trainerSubscription: Subscription;
  trainers;
  model = new Trainer();

 closeResult: string;

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

  addTrainer(form) {
    
    console.log(this.model.name + ' '  + this.model.email + ' ' + this.model.title + ' ' + this.model.tier);
    alert(this.model.name + ' '  + this.model.email + ' ' + this.model.title + ' ' + this.model.tier);
    // this.trainerService.createTrainer(name, title, email, tier);
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

