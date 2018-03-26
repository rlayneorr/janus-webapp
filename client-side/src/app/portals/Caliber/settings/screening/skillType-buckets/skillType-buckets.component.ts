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
  editBucket: Bucket;

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
    this.bucketService.setBucket(item);;
    this.router.navigate(["Caliber/settings/category"]);
    console.log("routing to category");
    console.log(this.bucketService.currentBucket);
  }


  /** Modal variables, and functions */
  closeResult: string;

  open(editBucket) {
    this.modalService.open(editBucket).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  // @Input() skillType: SkillType; // what is this???
  // allSkillTypeBuckets: any[] = [];
  // skillTypeBuckets = [];
  // testBuckets: any[] = [];

  /* routeToBucket(item: Bucket) {
    //this.router.navigateByUrl("/Caliber/settings/category");
    
    this.bucketService.setBucket(item);
  

    console.log("The name: " +this.bucketService.getCurrentBucket());
    console.log(this.bucketService.getCurrentBucket());
     console.log("routing to category");
     this.ngOnDestroy(item);
     this.router.navigate(["Caliber/settings/category"]);
   }
  */



  /*
  id: number;
      name: string;
      description: string;
      isActive?: boolean = true;
      mappedToSkillType?: boolean = false;
      weight?: number;
   */

  // testSingleBucket: Bucket = {
    // id: 1, 
    // name: "JavaScript", 
    // description: "basic JS", 
    // isActive: true, 
    // mappedToSkillType: false,
    // weight: 20
  // }

  // editBucket(name) {
    // this.testSingleBucket.name =name;
   // console.log("Need to edit bucket");
  // }

  // getSkillTypes() {

    // return this.allSkillTypeBuckets;
  // }

  /*
  getSkillTypeBuckets(id:number): Observable<SkillTypeBucket>{
    return this.skillTypesService.getBucketsBySkillType(id);
  }*/

  // showAddCategoryModal(){
    // console.log("Show 'Add category' modal button clicked");
  // }

}