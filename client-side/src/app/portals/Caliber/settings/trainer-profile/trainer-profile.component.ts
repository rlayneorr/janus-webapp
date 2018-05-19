import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { TrainerService } from '../../../../gambit-client/services/trainer/trainer.service';
import { HydraTrainer } from '../../../../gambit-client/entities/HydraTrainer';
import { BatchService } from '../../../../gambit-client/aggregator/services/completebatch.service';
import { CompleteBatch } from '../../../../gambit-client/aggregator/entities/CompleteBatch';
import { HydraTrainee } from '../../../../gambit-client/entities/HydraTrainee';
import { HydraTraineeService } from '../../../../gambit-client/services/trainee/gambit-trainee.service';
import { UserRole } from '../../../../gambit-client/entities/UserRole';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfilesComponent implements OnInit {

  /**
  * create variables for all batches,
  * current trainer and their batch
  */
  currentTrainer: HydraTrainer;
  batches: Array<CompleteBatch>;
  currentBatch: CompleteBatch;
  currentBatchTrainees: Array<HydraTrainee>;

  /**
  * create variables for subscribing and trainers
  * and storing form data
  */
  trainers: Array<HydraTrainer>;
  titles: Array<any>;
  userRoles: Array<UserRole>;
  model = new HydraTrainer();
  currEditTrainer: HydraTrainer;
  newRole: UserRole;
  newTitle: string;
  rForm: FormGroup;

  constructor(private trainerService: TrainerService, private modalService: NgbModal,
    private batchService: BatchService, private router: Router,
     private fb: FormBuilder, private traineeService: HydraTraineeService) { }

  ngOnInit() {
    /**
    * gets the current trainer for the page from trainer service's current trainer
    * if the current trainer is null navigate back to the trainers page so that the user can select one
    */
    // this.trainerService.currentTrainer.subscribe(currentTrainer => this.currentTrainer = currentTrainer);
    this.currentTrainer = this.trainerService.currentTrainer;
    if (this.currentTrainer == null) {
      this.router.navigate(['Caliber/settings/trainers']);
    }

    /**
    * fetches all batches and pushes into the batches object,
    */
    // this.batchService.fetchAll().subscribe(
    //   (batches: Batch[]) => { this.batches = batches; }
    // );

    this.batchService.fetchAllByTrainerId(this.currentTrainer.userId).subscribe(
      (batches: CompleteBatch[]) => { this.batches = batches; }
    );

    /**
    * fetches all trainers, titles and roles and pushes them onto the trainers, titles and roles observables
    */
    this.trainerService.fetchAll().subscribe((resp) => {
      this.trainers = resp;
    });
    this.trainerService.fetchTitles().subscribe(res => this.titles = res);
    this.trainerService.fetchRoles().subscribe(res => {
      this.userRoles = (res.filter(role => role.role !== 'INACTIVE')); // filter out INACTIVE role
    });
  }

  /**
  * opens a modal
  *
  * @param content: String
  */
  open(content) {
    this.modalService.open(content);
  }

  /**
  * opens a large modal
  *
  * @param content: String
  */
  openLarge(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  /**
  * sets the current batch
  * triggered when a user clicks to see the trainees for a current batch
  *
  * @param content: String
  */
  setCurrentBatch(batch) {
    this.currentBatch = batch;
    this.traineeService.findAllByBatchAndStatus(batch.batchId, 'Training').subscribe( res =>
      this.currentBatch.trainees = res['traineeIds']
    );
    console.log(batch);
  }

  /**
  * navigates to the reports page
  */
  navReports() {
    this.router.navigate(['Caliber/reports']);
  }

  /**
  * navigates to the manage page
  */
  navManage() {
    this.router.navigate(['Caliber/manage']);
  }

  /**
  * Open modal and get Trainer that belong to this modal
  * Backup these fields before the edit
  *
  * @param content: String
  * @param modalTrainer: Trainer
  */
  editTrainer(content, modalTrainer: HydraTrainer) {
    this.currEditTrainer = modalTrainer;
    this.newRole = modalTrainer.role;
    this.newTitle = modalTrainer.title;
    this.rForm = this.fb.group({
      'firstName': [this.currEditTrainer.firstName, Validators.required],
      'lastName': [this.currEditTrainer.lastName, Validators.required],
      'email': [this.currEditTrainer.email, Validators.email],
      'title': [this.newTitle, Validators.required],
      'role': [this.newRole.role, Validators.required],
    });
    this.modalService.open(content, { size: 'lg' });
  }

  /**
  * When role was changed
  *
  * @param newRole: string
  */
  roleChange(newRole) {
    this.newRole = newRole;
  }

  /**
  * When title was changed
  *
  * @param newTitle: string
  */
  titleChange(newTitle) {
    // Empty title, changed back to original
    if (newTitle === '') {
      this.newTitle = this.currEditTrainer.title;
    } else {
      // New title was changed
      this.newTitle = newTitle;
    }
  }

  /**
  * update button clicked, takes the value of the modal
  *
  * @param modal: any
  */
  updateTrainer(modal: NgForm) {
    const updatedTrainer: HydraTrainer = modal.value;
    updatedTrainer.userId = this.currEditTrainer.userId;
    updatedTrainer.role = this.roleMapping(modal.value.role);

    this.trainerService.update(updatedTrainer).subscribe((resp) => {
      this.currEditTrainer = updatedTrainer;
      this.ngOnInit();
    });
  }

  roleMapping(role: string) {
    for (let index = 0; index < this.userRoles.length; index++) {
      if (role === this.userRoles[index].role) {
        return this.userRoles[index];
      }
    }
  }
}
