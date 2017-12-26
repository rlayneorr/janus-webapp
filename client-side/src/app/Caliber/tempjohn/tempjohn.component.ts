import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Trainer } from '../entities/Trainer';
import { TrainerService } from '../services/trainer.service';
import { Observable } from 'rxjs/Observable';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tempjohn',
  templateUrl: './tempjohn.component.html',
})
export class TempJohnComponent implements OnInit {

    closeResult: string;
    trainers: Array<Trainer>;
    updTrainer = new Trainer();
    private trainerService: TrainerService;

    constructor(trainerService: TrainerService, private modalService: NgbModal) {
        this.trainerService = trainerService;
    }

    ngOnInit() {
        console.log('before fetch all');
        this.trainerService.fetchAll();
        console.log('after fetch all');
        this.trainerService.getList()
        .subscribe(
            (trainers: Trainer[]) => { this.trainers = trainers; }
        );
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
          return  `with: ${reason}`;
        }
      }
      updateInfo() {
          console.log('in the update trainer method Name: ' + this.trainers[0].name + ' Email: '
          + this.trainers[0].email + ' Tier: ' + this.trainers[0].tier);
      }
}
