import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// rxjs
import {Subscription} from 'rxjs/Subscription';
// entities
import {CompleteBatch} from '../../../../caliber-client/aggregator/entities/CompleteBatch';
// services
import {BatchService} from '../../../../caliber-client/aggregator/services/completebatch.service';
import {TrainingTypeService} from '../../services/training-type.service';
import {GambitSkillTypeService} from '../../../../caliber-client/services/skillType/gambit-skill-type.service';
import {LocationService} from '../../services/location.service';
import {TrainerService} from '../../services/trainer.service';
import {Trainer} from '../../entities/Trainer';
import {Address} from '../../entities/Address';
import {GambitSkillType} from '../../../../caliber-client/entities/GambitSkillType';


@Component({
  selector: 'app-manage-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public initialBatch: CompleteBatch;

  @Input()
  public batch: CompleteBatch;

  public trainers: Trainer[];
  public skillTypes: GambitSkillType[];
  public locations: Address[];
  public trainingTypes: string[];
  batchType: string;
  isNewBatch: boolean;

  defaultValue1 = 'Select Training Type';
  defaultValue2 = 'Select Skill Type';

  private savedBatchSubscription: Subscription;
  private trainingTypeListSubscription: Subscription;
  private locationListSubscription: Subscription;
  private trainerListSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private batchService: BatchService,
    private trainingTypeService: TrainingTypeService,
    private skillTypeService: GambitSkillTypeService,
    private locationService: LocationService,
    public trainerService: TrainerService
  ) {
    this.batch = new CompleteBatch();
    this.setLocations([]);
    this.setTrainers([]);
    this.setTrainingTypes([]);
  }

  public setLocations(locations: Address[]): void {
    this.locations = locations;
  }

  public setTrainers(trainers: Trainer[]): void {
    this.trainers = trainers;
  }

  public setTrainingTypes(types: string[]): void {
    this.trainingTypes = types;
  }

  public clone() {
    Object.assign(this.batch, this.initialBatch);
  }

  close(result: any): void {
    this.activeModal.close(result);
    this.clone();
  }

  dismiss(result: any): void {
    this.activeModal.dismiss(result);
    this.clone();
  }

  save(): void {
    this.batchService.update(this.batch);
    this.close(this.batch);
  }

  create(): void {
    this.batchService.create(this.batch);
    this.close(this.batch);
  }

  /** Dynamically updates the createBatch location selected inside the
  * create batch modal whenever a location is selected from the dropdown
  */
  onLocationSelect(addressId: number): void {
    for (const location of this.locations) {
      if (Number(location.addressId) === Number(addressId)) {
        this.batch.location = location.city;
      }
    }
  }

  /**
  * Dynamically updates the createBatch trainer selected inside the
  * create batch modal whenever a trainer is selected from the dropdown
  */
  onTrainerSelect(trainerId: number): void {
    for (const trainer of this.trainers) {
      if (Number(trainer.trainerId) === Number(trainerId)) {
        this.batch.trainer.userId = trainer.trainerId;
      }
    }
  }


  /**
  * Dynamically updates the createBatch coTrainer selected inside the
  * create batch modal whenever a trainer is selected from the dropdown
  */
  onCoTrainerSelect(trainerId: number): void {
    for (const trainer of this.trainers) {
      if (Number(trainer.trainerId) === Number(trainerId)) {
        this.batch.cotrainer.userId = trainer.trainerId;
      }
    }
  }

  ngOnInit() {

  /**
  * keep an updated list of trainers
  */
    this.trainerListSubscription = this.trainerService.listSubject
      .subscribe((trainers) => this.setTrainers(trainers));


    this.locationListSubscription = this.locationService.listSubject
      .subscribe((locations) => this.setLocations(locations));

    /*fetches all training types */
    /*this.trainingTypeService.fetchAll();*/
    this.trainingTypeListSubscription = this.trainingTypeService.listSubject
      .subscribe((types) => this.setTrainingTypes(types));

    /*fetches all skills */
    this.skillTypeService.findAllActive().subscribe(skillTypes => {
      this.skillTypes = skillTypes;
    });

    /* fetches all batches */
    this.batchService.fetchAll();

    /* fetches all trainers */
    this.trainerService.fetchAll();

    /* fetches all training locations */
    this.locationService.fetchAll();

    /* basic logic to assign the header and button names to what the modal
    is being used for
    If current batch is empty we are creating a new batch
    If current batch has a field asssigned already we are updating a batch
    isNewBatch is assigned so that the proper functions are called from the buttons
    This should be redesigned */

    if (this.batch.trainer.userId === 0) {
      this.batchType = 'Create New Batch';
      this.isNewBatch = true;
    } else {
      this.batchType = 'Update Batch';
      this.isNewBatch = false;
    }

    this.clone();
  }

  /**
   * Unsubscribes from all subscriptions before destroyed.
   */
  ngOnDestroy(): void {
    this.locationListSubscription.unsubscribe();
    this.trainerListSubscription.unsubscribe();
    this.trainingTypeListSubscription.unsubscribe();
  }

  ngOnChanges(): void {
    this.clone();
  }

}
