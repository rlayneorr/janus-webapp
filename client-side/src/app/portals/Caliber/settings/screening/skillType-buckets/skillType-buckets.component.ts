import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes}  from '@angular/animations';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
//import { SkillTypesComponent } from '../skillTypes/skillTypes.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-skillType-buckets',
  templateUrl: './skillType-buckets.component.html',
  styleUrls: ['./skillType-buckets.component.css'],
})

export class SkillTypeBucketsComponent implements OnInit {


  allSkillTypeBuckets: any[] = [];
  skillTypeBuckets = [];
  testBuckets: any[] = [];
  //state: string = 'small';
  bucketName:string = null;
 // testBucketPlease;
  show:boolean = false;

  constructor(
 //   private skillTypes : SkillTypesComponent,
    private modalService: NgbModal,
    private skillTypesService: SkillTypesService,
    private router: Router,
     private bucketsService:BucketsService,
   //  private route: ActivatedRoute,
     private location: Location
  ) { }

  /*
  open(content) {
    this.modalService.open(content);
    event.stopPropagation();
  }
*/
  ngOnInit() {
    //this.skillType = {id: 1, name: "Java", isActive: true};
  /*  this.allSkillTypeBuckets = [
      {Name: "HTML/CSS", Weight: 30, isActive: true},
      {Name: "Core Java", Weight: 40, isActive: true},
      {Name: "SQL", Weight: 30, isActive: true}
    ]*/

  //  this.testBuckets=["test1","test2","test3"];


}
/*
/*
id: number;
    name: string;
    description: string;
    isActive?: boolean = true;
    mappedToSkillType?: boolean = false;
    weight?: number;
 */
/*
testSingleBucket : Bucket = {id:1,name:"JavaScript",description:"basic JS", isActive: true, mappedToSkillType:false,
weight:20}
editBucket(name){
  this.testSingleBucket.name =name;
 // console.log("Need to edit bucket");
}*/

getSkillTypes() {

  //  return this.allSkillTypeBuckets;
  }
 
  /*
 getSkillTypeBuckets(id:number): Observable<SkillTypeBucket>{
//   return this.skillTypesService.getBucketsBySkillType(id);
 }
 */
  //item: any
  /*
  routeToBucket(item:any){
  //  this.router.navigateByUrl("/Caliber/settings/category");
  console.log(item);
  this.bucketsService.testBucket.name = item;
  console.log(this.bucketsService.testBucket.name);
  this.bucketsService.getDescription();

  console.log("The description: "+ this.bucketsService.testBucket.description);
   this.router.navigate(["Caliber/settings/category"]);

  }*/


  showAddCategoryModal(){
  //  console.log("Show 'Add category' modal button clicked");
  }

}