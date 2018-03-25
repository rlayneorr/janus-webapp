import { Component, OnInit } from '@angular/core'; // Input was also added for ??? reason
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
 import { Router } from '@angular/router';

@Component({
  selector: 'app-skillType-buckets',
  templateUrl: './skillType-buckets.component.html',
  providers: [ BucketsService ],
  styleUrls: ['./skillType-buckets.component.css']
})

export class SkillTypeBucketsComponent implements OnInit {

  /** variable to hold an array of 'Bucket' entities */
  buckets: Bucket[];
  /** variable to hold bucket being edited */
  editBucket: Bucket;

  constructor(private bucketService: BucketsService,
    private router: Router) {}

  ngOnInit() {
    this.getBuckets();
  }

  getBuckets(): void {
    this.bucketService.getAllBuckets()
      .subscribe(buckets => this.buckets = buckets);
  }

   routeToBucket(item: Bucket) {
    //this.router.navigateByUrl("/Caliber/settings/category");
    
    this.bucketService.setBucket(item);
  

    console.log("The name: " +this.bucketService.getCurrentBucket());
    console.log(this.bucketService.getCurrentBucket());
     console.log("routing to category");
     this.ngOnDestroy(item);
     this.router.navigate(["Caliber/settings/category"]);
   }
  
   ngOnDestroy(item:Bucket){
     this.bucketService.setBucket(item);
   }


  
  // open(content) {
    // this.modalService.open(content);
    // event.stopPropagation();
  // }



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
 
  //item: any

}