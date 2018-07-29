import {Component, OnInit} from '@angular/core';
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
import {fade, removeItem} from "../../../../../Animations/caliber-animations";


@Component({
  selector: 'app-buckets',
  templateUrl: './buckets.component.html',
  styleUrls: ['./buckets.component.css'],
  animations: [
    fade
  ]

})
export class BucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  categories : Category[];
  /** variable to hold bucket being edited */
  currBucket: Bucket;
  /** variable to hold new bucket being created  */
  newBucket: Bucket = new Bucket();
  //choose the default value of select
  selectValue : string;
  category : Category;
  //custom state for animation
  state : string = "normal";
  //user has to confirm to be able to delete
  confirm : boolean = false;

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

        //be able to print out the name of the bucket since it doesn't have a bucket name in the database.
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
    this.selectValue = bucket.categoryId.toString();
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
      this.bucketService.updateBucket(bucketParam).subscribe();
      this.savedSuccessfully();
    }
  }

  confirmDelete(bucket: Bucket){
    this.currBucket = bucket;
  }

  changeConfirm(){
    this.confirm = true;
    this.removeBucket(this.currBucket);
  }

  changeAnimationState(){
    this.state === "normal" ? this.state = "update" : this.state = "normal";
  }

  deleteBucket(){
    this.bucketService.deleteBucket(this.currBucket.bucketId).subscribe(result => {
      this.getBuckets();
    }, ()=> {this.alertsService.error('Error Deleting Bucket');}, ()=>{this.confirm = false});

    this.alertsService.success('Successfully Deleted Bucket');
  }

  removeBucket(bucket : Bucket) {
    console.log('confirm is ', this.confirm);
        //check if user really wants to delete the bucket
        if(this.confirm === true){
          for (const bucketIndex in this.buckets) {
            if (this.buckets[bucketIndex] === bucket) {
              this.buckets.splice(Number(bucketIndex), 1);
            }
          }
          this.deleteBucket();
          this.confirm = false;
        }
  }

  /** Creates new bucket */
  createBucket() {
    this.newBucket.isActive = false;
    console.log("this.newBucket.category", this.newBucket.category);
    // The server will generate the id for this new hero
    this.bucketService.createNewBucket(this.newBucket)
      .subscribe(bucket => {

        //look for the category id and then return the title
        for(let x = 0; x < this.categories.length; x++){
          //if any match then set the title
          if(bucket.categoryId === this.categories[x].categoryId){
            bucket.category = this.categories[x].title;
          }
        }

        this.buckets.push(bucket);
      }, ()=> {this.alertsService.error('Error Creating Bucket');}, ()=>{
        //this.getBuckets()
      });
    this.alertsService.success('Created Successfully');
  }

  savedSuccessfully() {
    this.alertsService.success('Update Successfully');
  }

  open(content) {
    //this.state = "removed";
    //console.log("removed", this.state);
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
