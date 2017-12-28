import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TrainerService } from '../../services/trainer.service';
import { Trainer } from '../../entities/Trainer';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  model = new Trainer();

  currEditTrainer: Trainer;
  newTier: String;
  newTitle: String;

  rForm: FormGroup;

  constructor(private trainerService: TrainerService,
    private modalService: NgbModal, private fb: FormBuilder) { }

  ngOnInit() {
    this.trainerService.populateOnStart();
    this.trainerSubscription = this.trainerService.getList().subscribe((resp) => {
      this.trainers = resp;
    });
    this.trainerSubscription = this.trainerService.getTitlesList().subscribe((resp) => {
      this.titles = resp;
    });
    this.trainerSubscription = this.trainerService.getTierList().subscribe((resp) => {
      this.tiers = resp;
    });
  }


  addTrainer(form) {
    // console.log(this.model.name + ' ' + this.model.email + ' ' + this.model.title + ' ' + this.model.tier);
    // alert(this.model.name + ' '  + this.model.email + ' ' + this.model.title + ' ' + this.model.tier);
    this.trainerService.createTrainer(this.model.name, this.model.title, this.model.email, this.model.tier);
  }


  open(content) {
    this.modalService.open(content);
  }

  /**
   * backup original fields, and open modal for editing
   * @param content: modal form 
   * @param modalTrainer: trainer belong to this modal 
   */
  editTrainer(content, modalTrainer: Trainer) {
    this.currEditTrainer = modalTrainer;
    this.newTier = modalTrainer.tier;
    this.newTitle = modalTrainer.title;
    this.rForm = this.fb.group({
      'name': [this.currEditTrainer.name, Validators.required],
      'email': [this.currEditTrainer.email, Validators.required],
      'title': [this.newTitle],
      'tier': [this.newTier],
    });
    this.modalService.open(content, { size: 'lg' });
  }

/**
 * Tier was changed, update with new value
 * @param newTier: tier string
 */
  tierChange(newTier) {
    this.newTier = newTier;
  }

  /**
   * If title is empty, change back to original title
   * else update with new title
   * @param newTitle: title string
   */
  titleChange(newTitle) {
    if (newTitle === '') {
      this.newTitle = this.currEditTrainer.title;
    } else {
      this.newTitle = newTitle;
    }
  }


  newTierChange(newTier) {
    this.model.tier = newTier;
  }

  newTitleChange(newTitle) {
    this.model.title = newTitle;
  }

  /**
   * update the fields in currently edited trainer
   * and send update request
   * @param modal: modal value with all the fields
   */
  updateTrainer(modal) {
    // replacing the trainer's fields with the new ones
    this.currEditTrainer.tier = this.newTier;
    this.currEditTrainer.title = this.newTitle;
    this.currEditTrainer.name = modal.name;
    this.currEditTrainer.email = modal.email;
    // call trainerService to update
    this.trainerService.update(this.currEditTrainer);
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
