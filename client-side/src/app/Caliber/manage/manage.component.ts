import { Component, OnInit, OnDestroy } from '@angular/core';
import { BatchService} from '../services/batch.service';
import { TrainerService } from '../services/trainer.service';
import { LocationService } from '../services/location.service';
import { Location } from '../entities/Location';
import { Trainer } from '../entities/Trainer';
import { Batch } from '../entities/Batch';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe} from '@angular/common';
import { format } from 'url';
import { Subscription } from 'rxjs/Subscription';
import { DisplayBatchByYear } from './manage.pipe';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
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
  batchByYear: Date[] = [];
  batchYearsNoDuplicates: number[] = [];
  currentYear = 2017;
  currentBatch: Batch;

  traineeProfileUrl: string;


  trainers: Trainer[] = [];
  trainerNames: string[] = [];

  locations: Location[] = [];
  locationNames: string[] = [];

  batchSub: Subscription;
  trainerSub: Subscription;
  locationSub: Subscription;

  constructor(private batchService: BatchService, private trainerService: TrainerService,
    private locationService: LocationService,
    private modalService: NgbModal, private datePipe: DatePipe) {
   }


   ngOnInit() {
      this.batchService.fetchAll();
      this.batchSub = this.batchService.getList().subscribe(batch => {
        this.batches = batch;
        const batchYears = [];
        for (let i = 0; i < this.batches.length; i++) {
          const newDate = this.datePipe.transform(this.batches[i].startDate, 'yyyy');
          batchYears.push(newDate);
      }
      this.batchYearsNoDuplicates = Array.from(new Set(batchYears));
     });

     this.trainerService.fetchAll();
     this.trainerSub = this.trainerService.getList().subscribe(trainer => {
       this.trainers = trainer;
       for (let i = 0; i < this.trainers.length; i++) {
         this.trainerNames.push(this.trainers[i].name);
       }
     });

     this.locationService.fetchAll();
     this.locationSub = this.locationService.getList().subscribe(location => {
       this.locations = location;
     });

  }

  ngOnDestroy() {

    this.batchSub.unsubscribe();

  }

  createBatch() {


  }

  deleteBatch() {

  }


  openCreateBatchModal(createBatch) {

    console.log(this.trainers);

    this.modalService.open(createBatch).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openImportBatchModal(importBatch) {

    this.modalService.open(importBatch).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  openViewBatchTraineesModal(traineesInBatch, batch) {

    this.modalService.open(traineesInBatch, {size: 'lg', container: '.batch-trainee-modal-container'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.currentBatch = batch;
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

  updateYear(year) {
    this.currentYear = year;
  }


}

