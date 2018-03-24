import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
import { Bucket } from '../entities/Bucket';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import {BucketsService} from'../services/buckets.service';


@Component({
  selector: 'app-skillTypes',
  templateUrl: './skillTypes.component.html',
  styleUrls: ['./skillTypes.component.css'],
})

export class SkillTypesComponent implements OnInit {

  public skillTypes:any[]=[];
  public inactiveSkillTypes:any[]=[];
  public allSkillTypes:any[]=[];
  public bigGroup:any[]=[];
  removeElement(item:any){
    let thing:any;
    for(let i = 0 ;i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.name == item.name){
        thing.isActive = !thing.isActive;
        this.allSkillTypes[i] = thing;
      }
    }
    this.setSkillTypes();

  }



  testingGettingTags(){
    var tag ={
        tagName : "Dolly",
        tagId :7
    }
    this.skillTypeService.testingCreatingTags(tag);
   this.skillTypeService.testingGetTags().subscribe(
      data =>{
        console.log(data);
      });
  }
  setSkillTypes(){
    let thing:any;
    this.skillTypes = [];
    this.inactiveSkillTypes = [];
    for(let i = 0; i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.isActive == true){
        this.skillTypes[this.skillTypes.length]=thing;
    }else if (thing.isActive == false){
        this.inactiveSkillTypes[this.inactiveSkillTypes.length]=thing;
      }
    }
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private skillTypeService: SkillTypesService,
    private bucket:BucketsService,
  ) { }
    


  createSkillType: FormGroup;
  newSkillType: SkillType;

  /**
   * initialize form control for validations
   *
   * @memberof SkillTypesComponent
   */
  initFormControl() {
    this.createSkillType = this.fb.group({
      'name': ['', Validators.required],
    });
  }

    // open(content) {
    //   this.modalService.open(content);
    //   event.stopPropagation();
    // }
    closeResult;
    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.testSingleSkillType = null;
      }, (reason) => {
        this.testSingleSkillType = null;
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

    addNewSkillType(modal: SkillType){
        this.newSkillType = modal;
        let sum = 0;
        let addedBucket = false;
        for(let bucketIndex in this.testBuckets){
            if(this.testBuckets[bucketIndex].isActive == true){
                addedBucket = true;
                sum += this.testBuckets[bucketIndex].weight;
            }
        }
        if(!addedBucket || sum == 100){
            console.log("Congrats! The sum of active buckets is: " + sum);
        } else {
            console.log("The weight has to equal 100");
        }
        //this.skillTypeService.createSkillType(this.newSkillType.name).subscribe();
        this.initFormControl();
    }

    java: Bucket = new Bucket(0, "Java", "This is Java");
    sql: Bucket = new Bucket(1, "SQL", "This is SQL");
    oop: Bucket = new Bucket(2, "OOP", "This is OOP");
    html: Bucket = new Bucket(3, "HTML", "This is HTML");

    testBuckets: Bucket[] = [
        this.java,
        this.sql,
        this.oop,
        this.html
    ]

    testSkillTypeBuckets: SkillTypeBucket[] = [
        { skillTypeId: 0, bucketId: 0, weight: 50 },
        { skillTypeId: 0, bucketId: 1, weight: 20 },
        { skillTypeId: 0, bucketId: 2, weight: 30 }
    ]

    testSingleSkillType: SkillType;

    editSkillType(skillType){
        this.testSingleSkillType = new SkillType();
        this.testSingleSkillType.name = skillType.name;
        this.editAllBuckets();
    }

    // set the skillType buckets within ALL BUCKETS to be already mapped
    editAllBuckets(){
        for(let index in this.testSkillTypeBuckets){
            for(let allIndex in this.testBuckets){
                if(this.testSkillTypeBuckets[index].bucketId == this.testBuckets[allIndex].id){
                    this.testBuckets[allIndex].weight = this.testSkillTypeBuckets[index].weight;
                    this.testBuckets[allIndex].mappedToSkillType = true;
                }
            }
        }
    }

    addToMapped(bucket){
        bucket.mappedToSkillType = true;
    }

    removeFromMapped(bucket){
        bucket.mappedToSkillType = false;
    }

    clearSkillTypeBuckets(){
        for(let index in this.testBuckets){
            this.testBuckets[index].mappedToSkillType = false;
            this.testBuckets[index].weight = 0;
        }
    }


  ngOnInit() {
    this.allSkillTypes = [
      {name:"Java",isActive:true},
      {name:'.Net',isActive:true},
      {name:'SDET',isActive:true},
      {name:'Label',isActive:true},
      {name:"Pega",isActive:false},
      {name:'Salesforce',isActive:false},
      {name:'Software',isActive:false}
    ]
    this.setSkillTypes();
    console.dir(this.bigGroup);
    this.initFormControl();
  }

}