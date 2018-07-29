import {Component, OnChanges, OnInit} from '@angular/core';
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
  selectValue : number;
  category : Category;

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

    this.categoryService.fetchAll().subscribe(categories => {
      this.categories = categories;
      console.log(categories);

      this.bucketService.getAllBuckets().subscribe(buckets => {
        this.buckets = buckets;
        console.log(this.buckets);
        this.buckets.map(b=> {
          b.category = findCategoryTitleById(b.categoryId);

          function findCategoryTitleById (id) {
            let result = categories.find(c=> c.categoryId === id);
            return result === undefined ? "FK MISMATCH" : result.title;
          }
        });
        this.buckets.sort(this.compare);
      });
    });
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
    console.log("Bucket: ", bucket);
    this.selectValue = bucket.categoryId;//.toString();
    console.log("selected value: ", this.selectValue);
    this.currBucket = bucket;
  }

  /**
   * resposible for making call for updatating a bucket
   * when editted or activity toggled
   * @param bucketParam
   */
  updateBucket(bucketParam: Bucket) {

    if (!bucketParam) {
      bucketParam = this.currBucket;
      this.currBucket.categoryId = this.newBucket.categoryId;
      this.currBucket.category = this.newBucket.category;
    }
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

    this.alertsService.success('Successfully Deleted Bucket');
  }

  /** Creates new bucket */
  createBucket() {
    this.newBucket.isActive = false;
    // The server will generate the id for this new hero
    this.bucketService.createNewBucket(this.newBucket)
      .subscribe(bucket => {
        this.buckets.push(bucket);
      });
    this.alertsService.success('Created Successfully');
  }

  savedSuccessfully() {
    this.alertsService.success('Update Successfully');
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.newBucket = new Bucket();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.newBucket.category = '';
      this.newBucket.bucketDescription = '';
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    event.stopPropagation();
  }

  /*
  *
  *   Get the value from the Select Dropdown Menu
  *
  * */
   getSelectedCategory($myCategoryId){
     //getting category by ID
     let cat = this.categories.find(c=>c.categoryId === +$myCategoryId);

     this.newBucket.category = cat.title;
     this.newBucket.categoryId = cat.categoryId;
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
