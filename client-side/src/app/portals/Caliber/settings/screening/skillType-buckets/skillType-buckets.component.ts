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
})

export class SkillTypeBucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  /** variable to hold bucket being edited */
  bucketToEdit: Bucket;

  constructor(
    private router: Router,
    private bucketService: BucketsService,
    private modalService: NgbModal) {}

  ngOnInit() {
    this.getBuckets()
}

getBuckets():void {
    this.bucketService.getAllBuckets().subscribe(buckets => this.buckets = buckets);
}

/*
id: number;
    name: string;
    description: string;
    isActive?: boolean = true;
    mappedToSkillType?: boolean = false;
    weight?: number;
 */

getSkillTypes() {

    //return this.allSkillTypeBuckets;
 }

  /** Save the selected 'bucket' in 'bucket.service' to be used in
    * 'bucket.component'.
    * Then route to 'bucket.component'.
    */
  routeToBucket(item: Bucket) {
    this.bucketService.setBucket(item);
    console.log("routing to category");
    console.log(this.bucketService.currentBucket);
    this.router.navigate(["Caliber/settings/screening/category"]);
  }

  /** Stores the value of selected bucket to a 'bucketToEdit' */
  editBucket(bucket) {
    this.bucketToEdit = bucket;
    console.log(this.bucketToEdit);
  }

  updateBucket() {
    if (this.bucketToEdit) {
      this.bucketService.updateBucket(this.bucketToEdit)
        .subscribe(bucket => {
          // replace the bucket in the buckets list with update from server
          const ix = bucket ? this.buckets.findIndex(h => h.id === bucket.id) : -1;
          if (ix > -1) { this.buckets[ix] = bucket; }
        });
      this.bucketToEdit = undefined;
    }
  }


  /** Modal variables, and functions */
  closeResult: string;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
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

