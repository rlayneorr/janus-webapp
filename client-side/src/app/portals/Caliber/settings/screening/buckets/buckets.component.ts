import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/** component, service imports */
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../../../services/questions/questions.service';
/** style lib. imports */
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../services/alerts.service';
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../entities/Category";


@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.css']
})
export class BucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  categories : Category[];
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
    private alertsService: AlertsService,
    private categoryService : CategoryService) { }

  filter: Bucket = new Bucket();
  ngOnInit() {
    this.getBuckets();
  }

  getBuckets(): void {
    this.bucketService.getAllBuckets().subscribe(buckets => {
      this.buckets = buckets;
      this.buckets.sort(this.compare);
    });
    // this.categoryService.fetchAll().subscribe(categories => {
    //   this.categories = categories;
    //   console.log(categories);
    //
    // });
  }

  /** used to compare buckets Array to sort it based on status */
  compare(a: Bucket, b: Bucket) {
    if (a.isActive) {
      return -1;
    } else {
      return 1;
    }
  }

  /** Save the selected 'bucket' in 'bucket.service' to be used in
    * 'bucket.component'.
    * Then route to 'bucket.component'.
    */
  routeToBucket(item: Bucket) {
    this.bucketService.setBucket(item);
    this.router.navigate(['Caliber/settings/screening/bucket']);
  }

  /** Stores the value of selected bucket to a 'currBucket' */
  editBucket(bucket: Bucket) {
    this.currBucket = bucket;
  }

  /**
   * resposible for making call for updatating a bucket
   * when editted or activity toggled
   * @param bucketParam
   */
  updateBucket(bucketParam: Bucket) {
    if (!bucketParam) { bucketParam = this.currBucket; }
    if (bucketParam) {
      console.log(bucketParam.isActive);
      this.bucketService.updateBucket(bucketParam).subscribe(bucket => {
        this.getBuckets();
      });
      this.savedSuccessfully();
    }
  }

  confirmDelete(bucket: Bucket){
    this.currBucket = bucket;
  }

  deleteBucket(){
    this.bucketService.deleteBucket(this.currBucket.bucketId).subscribe( result => {
      this.getBuckets();
    });
  /*deleteBucket(bucketParam: Bucket){
    if (!bucketParam) { bucketParam = this.currBucket; }
    if (bucketParam) {
      console.log(bucketParam.isActive);
      this.bucketService.deleteBucket(bucketParam.bucketId);
      //   this.getBuckets();
      // });
      // this.savedSuccessfully();
    }*/
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
      this.newBucket.category = '';
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
      return `with: ${reason}`;
    }
  }
}
