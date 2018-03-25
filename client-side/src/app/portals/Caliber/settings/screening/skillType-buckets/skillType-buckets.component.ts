import { Component, OnInit } from '@angular/core'; // Input was also added for ??? reason
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
 import { Router } from '@angular/router';
// import { SkillTypeBucket } from '../entities/SkillTypeBucket';
// import { SkillType } from '../entities/SkillType';
// import { SkillTypesService } from '../services/skillTypes.service';
// import { SkillTypesComponent } from '../skillTypes/skillTypes.component';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { Observable } from 'rxjs/Observable';

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
  
  // @Input() skillType: SkillType; // what is this???
  // allSkillTypeBuckets: any[] = [];
  // skillTypeBuckets = [];
  // testBuckets: any[] = [];

  // bucketName:string = null;

  // constructor(
    // private skillTypes: SkillTypesComponent,
    // private modalService: NgbModal,
    // private skillTypesService: SkillTypesService,
     
    // private bucketService:BucketsService,

    //  private route: ActivatedRoute,
    //  private location: Location
  // ) { }

  // open(content) {
    // this.modalService.open(content);
    // event.stopPropagation();
  // }

  // ngOnInit() {
    // this.skillType = {id: 1, name: "Java", isActive: true};
    // this.allSkillTypeBuckets = [
      // {Name: "HTML/CSS", Weight: 30, isActive: true},
      // {Name: "Core Java", Weight: 40, isActive: true},
      // {Name: "SQL", Weight: 30, isActive: true}
    // ]

    // this.testBuckets=["test1","test2","test3"];


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
   routeToBucket(item: Bucket) {
    //this.router.navigateByUrl("/Caliber/settings/category");
    
    this.bucketService.setBucket(item);
   //this.router.navigate(["Caliber/settings/category"]);

    console.log("The name: " +this.bucketService.getCurrentBucket());
    console.log(this.bucketService.getCurrentBucket());
     console.log("routing to category");
   }


  // showAddCategoryModal(){
    // console.log("Show 'Add category' modal button clicked");
  // }

}