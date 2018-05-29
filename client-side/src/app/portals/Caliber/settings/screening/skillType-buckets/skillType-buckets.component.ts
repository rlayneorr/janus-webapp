import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/** component, service imports */
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../../../services/questions/questions.service';
/** style lib. imports */
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {AlertsService} from '../../../services/alerts.service';


@Component({
  selector: 'app-skill-type-buckets',
  templateUrl: './skillType-buckets.component.html',
  styleUrls: ['./skillType-buckets.component.css']
})

export class SkillTypeBucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  /** variable to hold bucket being edited */
  currBucket: Bucket;
  /** variable to hold new bucket being created  */
  newBucket: Bucket = new Bucket();

  /** Modal variables */
  closeResult: string;

  constructor(
    private router: Router,
    private bucketService: BucketsService,
    private questionService: QuestionsService,
    private modalService: NgbModal,
    private alertsService: AlertsService, ) {}

    filter: Bucket= new Bucket();
  ngOnInit() {
    this.getBuckets();
  }

  getBuckets(): void {
      this.bucketService.getAllBuckets().subscribe(buckets => {
            console.log(buckets);
            this.buckets = buckets;
            console.log(this.buckets[0].name);
       });
  }


  /** Save the selected 'bucket' in 'bucket.service' to be used in
    * 'bucket.component'.
    * Then route to 'bucket.component'.
    */
  routeToBucket(item: Bucket) {
    this.bucketService.setBucket(item);
    this.router.navigate(['Caliber/settings/screening/category']);
  }

  /** Stores the value of selected bucket to a 'currBucket' */
  editBucket(bucket) {
    this.currBucket = new Bucket();
    this.currBucket.id = bucket.id;
    this.currBucket.name = bucket.name;
    this.currBucket.description = bucket.description;
  }

  updateBucket() {
    if (this.currBucket) {
      this.bucketService.updateBucket(this.currBucket).subscribe(bucket => {
          console.log('bucket when it comes back ' + bucket.name);
          this.getBuckets();
        });
      this.savedSuccessfully();
    }
  }

  /** Creates new bucket */
  createBucket() {
    // The server will generate the id for this new hero
    this.bucketService.createNewBucket(this.newBucket)
      .subscribe(bucket => {
          this.buckets.push(bucket);
      });
  }

  savedSuccessfully() {
    this.alertsService.success('Saved successfully');
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.newBucket = new Bucket();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.newBucket.name = '';
      this.newBucket.description = '';
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    event.stopPropagation();
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
}
