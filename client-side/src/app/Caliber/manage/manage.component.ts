import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { format } from 'url';

// rxjs
import { Subscription } from 'rxjs/Subscription';

// pipes
import { DatePipe } from '@angular/common';
import { DisplayBatchByYear } from './manage.pipe';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

// services
import { BatchService} from '../services/batch.service';
import { TrainerService } from '../services/trainer.service';
import { LocationService } from '../services/location.service';
import { TrainingTypeService } from '../services/training-type.service';
import { SkillService } from '../services/skill.service';
import { TraineeService } from '../services/trainee.service';

// entities
import { Location } from '../entities/Location';
import { Trainer } from '../entities/Trainer';
import { Batch } from '../entities/Batch';
import { Address } from '../entities/Address';
import { Trainee } from '../entities/Trainee';

// components
import { BatchModalComponent } from './batch/batch-modal.component';

// import { exists } from 'fs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers: [DatePipe],
})
export class ManageComponent implements OnInit, OnDestroy {
  closeResult: string;
  batches: Batch[] = [];
  batchModal: NgbModalRef;
  batchByYear: Date[] = [];
  currentYear: number;
  currentBatch: Batch = new Batch;
  createNewBatch: Batch = new Batch;
  batchToUpdate: Batch = new Batch;
  traineeProfileUrl: string;
  test: string;
  trainers: Trainer[] = [];
  trainerNames: string[] = [];
  locations: Address[] = [];
  trainingTypes: string[] = [];
  skills: string[] = [];
  createNewTrainee: Trainee = new Trainee;

  /* Subscriptions */
  batchListSub: Subscription;
  trainerListSub: Subscription;
  locationListSub: Subscription;
  trainingTypeListSub: Subscription;
  skillListSub: Subscription;
  savedBatchSub: Subscription;
  deletedBatchSub: Subscription;

  constructor (
    private batchService: BatchService,
    private trainerService: TrainerService,
    private locationService: LocationService,
    private trainingTypeService: TrainingTypeService,
    private skillService: SkillService,
    private traineeService: TraineeService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
      this.batches = [];
   }


  /** Creates a new batch from batch service
  * createNewBatch is a batch that is dynamically populated from the modal
  * and function calls from the html in the modal
  */
  public saveBatch(batch: Batch): void {
    if ( batch.batchId === 0 ) {
      this.batchService.save(batch);
    } else {
      this.batchService.update(batch);
    }
  }

  public getBatchListYears(batches: Batch[]): number[] {
    const yearsSet: Set<number> = new Set();
    const years: number[] = [];

    for ( const batch of batches ) {
      const date = batch.startDate;
      const year = Number( this.datePipe.transform(date, 'yyyy') );
      yearsSet.add(year);
    }

    yearsSet.forEach( (value) => years.push(value) );

    years.sort();

    return years;
  }

  public openBatchModal(batch: Batch): void {
    if ( batch === null ) {
      batch = new Batch();
      batch.batchId = 0;
    }

    this.batchModal = this.modalService.open(BatchModalComponent, { size: 'lg' } );
    this.batchModal.componentInstance.batch = batch;
  }

  /** Keeps track of current year to display batch by years */
  private setCurrentYear(year: number): void {
    this.currentYear = year;
  }

  private setBatches(batches: Batch[]): void {
    const years = this.getBatchListYears(batches);

    this.batches = batches;

    /*
    * set the initial year to the latest year of
    * the batches
    */
    this.setCurrentYear( years[ years.length - 1] );
  }

  private setTrainers(trainers: Trainer[]): void {
    this.trainers = trainers;
  }

  private setLocations(locations: Location[]): void {
    this.locations = locations;
  }

  private setTrainingTypes(types: string[]): void {
    this.trainingTypes = types;
  }

  private setSkills(skills: string[]): void {
    this.skills = skills;
  }

  ngOnInit() {
    /*
    * keep an updated list of batches
    */
    this.batchListSub = this.batchService.getList()
      .subscribe( (batches) => this.setBatches(batches) );

    /*
     * reacts to saved batches
     */
    this.savedBatchSub = this.batchService.getSaved()
      .subscribe( (saved) => this.onSavedBatch(saved) );

    /*
     * reactes to deleted batches
     */
    this.deletedBatchSub = this.batchService.getDeleted()
      .subscribe( (deleted) => this.onDeletedBatch(deleted) );

     /* fetches all batches */
     this.batchService.fetchAll();
  }

  ngOnDestroy() {
    this.batchListSub.unsubscribe();
    this.savedBatchSub.unsubscribe();
    this.deletedBatchSub.unsubscribe();
  }


  createNewTraineeFunction() {
    this.traineeService.save(this.createNewTrainee);
  }

  deleteTraineeFunction(trainee) {
    /** In the original caliber app, deleting trainee removes the trainee
     * but the trainee reappears in the active trainees
     * Even when you remove the trainee, it isn't moved to inactive
     * This is because the trainee object is detached from the database
     *
     * This method shouldn't call traineeService, it needs to call a batchService
     * and apply a deleteTraineeByBatch(batch, trainee) so it can remove the trainee
     * from the current batch, and not delete the trainee overall
     *
     * Later implementation needs to move a trainee from active to inactive
     * and be able to actually delete a trainee from the database entirely
     */
    this.traineeService.delete(trainee);
  }



  /** Displays the Create Batch modal and assigns current batch
   * to the batch that is passed in from the table row
   */
  // openBatchModal(batch: Batch) {
  //   this.modalService.open(BatchComponent);
  //   this.saveModal = this.modalService.open(this.batchModalTemplate);

  //   this.saveModal.result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  /** Displays the Import Batch modal and assigns current batch
   * to the batch that is passed in from the table row
   */
  openImportBatchModal(importBatch) {

    this.modalService.open(importBatch).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

/** Displays the View Batch Trainees modal and assigns current batch
   * to the batch that is passed in from the table row
   */
  openViewBatchTraineesModal(traineesInBatch, batch) {

    this.modalService.open(traineesInBatch, {size: 'lg', container: '.batch-trainee-modal-container'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.currentBatch = batch;
  }

  /**
   * procedure for when a batch is saved
   * successfully to the API
   *
   * @param batch: Batch
   */
  onSavedBatch(batch: Batch): void {
    this.batchService.fetchAll();

    // this.saveModal.close();
  }

  /**
 * procedure for when a batch is deleted
 * successfully to the API
 *
 * @param batch: Batch
 */
  onDeletedBatch(batch: Batch): void {
    this.batchService.fetchAll();
  }

  /** Modal functionality */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

