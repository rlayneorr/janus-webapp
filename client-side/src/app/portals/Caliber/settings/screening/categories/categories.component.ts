import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/** component, service imports */
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../../../services/questions/questions.service';
/** style lib. imports */
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../../services/alerts.service';
import { Category } from '../entities/Category';
import { SettingsCategoriesService } from '../services/categories.service';
import {fade} from "../../../../../Animations/caliber-animations";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations:[fade]
})

export class CategoriesComponent implements OnInit {

  /** variable to hold an array of 'Category' entities */
  allCategories: Category[];
  /** variable to hold an array of 'Bucket' entities */
  allBuckets: Bucket[];
  /** variable to hold bucket being edited */
  currentCategory: Category;
  /** variable to hold new bucket being created  */
  newCategory: Category = new Category();

  changedBuckets: Bucket[];
  /** Modal variables */
  closeResult: string;
  confirm : boolean = false;

  constructor(
    private router: Router,
    private bucketService: BucketsService,
    private categoryService: SettingsCategoriesService,
    private questionService: QuestionsService,
    private modalService: NgbModal,
    private alertsService: AlertsService, ) { }

  filter: Category = new Category();
  ngOnInit() {
    this.getCategories();
    this.getBuckets();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(result => {
      this.allCategories = result;
      console.log(result);
    });
  }

  getBuckets(): void {
    this.bucketService.getAllBuckets().subscribe(result => {
      this.allBuckets = result;
    });
  }

  /** used to compare buckets Array to sort it based on status */
  // compare(a: Category, b: Category) {
  //   if (a.isActive) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // }

  // /** Save the selected 'bucket' in 'bucket.service' to be used in
  //   * 'bucket.component'.
  //   * Then route to 'bucket.component'.
  //   */
  // // routeToBucket(item: Category) {
  // //   this.bucketService.setBucket(item);
  // //   this.router.navigate(['Caliber/settings/screening/bucket']);
  // // }

  /** Stores the value of selected bucket to a 'currBucket' */
  editCategory(category: Category) {
    this.currentCategory = category;
    this.changedBuckets = [];
  }
  logState() {
    console.log("changed:", this.changedBuckets);
    console.log("CurrentCategory:", this.currentCategory);
  }
  /**
   * resposible for making call for updatating a bucket
   * when editted or activity toggled
   * @param bucketParam
   */
  updateCategory(catParam: Category) {
    if (!catParam) { catParam = this.currentCategory; }
    if (catParam) {
      this.logState();
      this.changedBuckets.forEach(b=>this.bucketService.updateBucket(b).subscribe());

      this.categoryService.updateCategory(catParam).subscribe(bucket => {
        //this.getCategories();
      });
      this.logState();
      this.savedSuccessfully();
    }
  }

  /*
  *   User clicks the trashcan
  * */
  confirmDelete(category: Category){
    this.currentCategory = category;
  }

  /*
  *   User confirms the prompt to really delete the category
  * */
  changeConfirm(){
    this.confirm = true;
    this.removeCategory();
  }

  /*
  *
  *   Remove category from the DOM by splicing from the array
  *   Then call the deleteCategory()
  * */
  removeCategory(){
    //check if user really wants to delete the question
    if(this.confirm === true){
      for (const categoryId in this.allCategories) {
        if (this.allCategories[categoryId] === this.currentCategory) {
          this.allCategories.splice(Number(categoryId), 1);
        }
      }
      this.deleteCategory();
      this.confirm = false;
    }
  }

  /*
  *
  *   Direct call to the service to delete the category from the database.
  * */
  deleteCategory(){
    this.categoryService.deleteCategory(this.currentCategory.categoryId).subscribe();
  }

  /** Creates new category */
  createCategory() {
    console.log(this.currentCategory);
    this.categoryService.createCategory(this.newCategory)
      .subscribe(category => {
        //this.getCategories();
        this.allCategories.push(<Category>category);
      });
  }

  addActiveBucket(bucket: Bucket) {
    if(!this.currentCategory){
        this.currentCategory = {
          categoryId: null,
          title: null,
          categoryWeight: null,
          buckets: []
        };
    }

    if (this.currentCategory) {
      bucket.isActive = true;
      if(!this.changedBuckets.includes(bucket)) {
        this.changedBuckets.push(bucket);
      }
    }
  }

  removeActiveBucket(bucket: Bucket) {
    console.log("bucket: ", bucket, "\n", "category: ", this.currentCategory);
    if (this.currentCategory) {
      bucket.isActive = false;
      if(!this.changedBuckets.includes(bucket)) {
        this.changedBuckets.push(bucket);
      }
    }
  }

  // Check if a bucket and a category is related and if the bucket is active.
  containsActiveBucket(bucket: Bucket) {
    if (this.currentCategory && this.currentCategory.categoryId === bucket.categoryId && bucket.isActive) {
      return true;
    }
    return false;
  }

  containsInactiveBucket(bucket: Bucket) {
    if (this.currentCategory && this.currentCategory.categoryId === bucket.categoryId && !bucket.isActive) {
      return true;
    }
    return false;
  }

  savedSuccessfully() {
    this.alertsService.success('Saved successfully');
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.newCategory = new Category();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.newCategory.title = '';
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
