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


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
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

  /** Modal variables */
  closeResult: string;

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
  }

  /**
   * resposible for making call for updatating a bucket
   * when editted or activity toggled
   * @param bucketParam
   */
  updateCategory(catParam: Category) {
    if (!catParam) { catParam = this.currentCategory; }
    if (catParam) {
      this.categoryService.updateCategory(catParam).subscribe(bucket => {
        this.getCategories();
      });
      this.savedSuccessfully();
    }
  }

  confirmDelete(category: Category){
    this.currentCategory = category;
  }

  deleteCategory(){
    if (this.currentCategory) {
      this.categoryService.deleteCategory(this.currentCategory.categoryId).subscribe(result => {
        this.getCategories();
      });
      this.savedSuccessfully();
    }
  }

  /** Creates new category */
  createCategory() {
    this.newCategory.buckets = this.currentCategory.buckets;
    this.categoryService.createCategory(this.newCategory)
      .subscribe(category => {
        this.getCategories();
      });
  }

  addBucket(bucket: Bucket) {
    if(!this.currentCategory){
        this.currentCategory = {
          categoryId: null,
          //categoryName: null,
          title: null,
          categoryWeight: null,
          buckets: []
        };
    }

    if (this.currentCategory) {
        this.currentCategory.buckets.push(bucket);
    }
  }

  removeBucket(bucket: Bucket) {
    if (this.currentCategory) {
      for (const bucketIndex in this.currentCategory.buckets) {
        if (this.currentCategory.buckets[bucketIndex] === bucket) {
          this.currentCategory.buckets.splice(Number(bucketIndex), 1);
        }
      }
    }
  }

  checkContains(bucket: Bucket) {
    if (this.currentCategory) {
        return this.currentCategory.buckets.includes(bucket);
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
      //this.newCategory.categoryName = '';
      this.newCategory.title = '';
      this.newCategory.buckets = [];
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
