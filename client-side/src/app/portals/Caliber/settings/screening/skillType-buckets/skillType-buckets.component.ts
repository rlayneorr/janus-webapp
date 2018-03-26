import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/** component, service imports */
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
/** style lib. imports */
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-skillType-buckets',
  templateUrl: './skillType-buckets.component.html',
  styleUrls: ['./skillType-buckets.component.css'],
  providers: [ BucketsService ]
})

export class SkillTypeBucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  /** variable to hold bucket being edited */
  currBucket: Bucket;
  /** variable to hold new bucket being created  */
  newBucket: Bucket = new Bucket('', '', '');

  constructor(
    private router: Router,
    private bucketService: BucketsService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.getBuckets();
  }

  getBuckets(): void {
    this.bucketService.getAllBuckets()
      .subscribe(buckets => this.buckets = buckets);
  }

  /** Save the selected 'bucket' in 'bucket.service' to be used in 
    * 'bucket.component'.
    * Then route to 'bucket.component'.  
    */
  routeToBucket(item: Bucket) {
    this.router.navigate(["Caliber/settings/category"]);
    console.log(item);
    console.log("routing to category");
  }

  /** Stores the value of selected bucket to a 'currBucket' */
  editBucket(bucket) {
    this.currBucket = bucket;
    console.log(this.currBucket);
  }

  updateBucket() {
    if (this.currBucket) {
      this.bucketService.updateBucket(this.currBucket)
        .subscribe(bucket => {
          // replace the bucket in the buckets list with update from server
          const ix = bucket ? this.buckets.findIndex(h => h.id === bucket.id) : -1;
          if (ix > -1) { this.buckets[ix] = bucket; }
        });
      this.currBucket = undefined;
    }
  }

  createBucket() {
    console.log('CREATING' + this.currBucket);
    // TODO
  }

  /** Modal variables, and functions */
  closeResult: string;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.newBucket.name = '';
      this.newBucket.description = '';
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