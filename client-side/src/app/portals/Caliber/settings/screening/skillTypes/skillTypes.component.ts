import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
import { Bucket } from '../entities/Bucket';
//import { SkillTypeBucket } from '../entities/SkillTypeBucket';
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
  bucketWeightSum: number = 0;

  removeElement(item:any){
    let thing:any;
    for(let i = 0 ;i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.skillTypeName == item.skillTypeName){
        thing.isActive = !thing.isActive;
        this.allSkillTypes[i] = thing;
      }
    }
    this.setSkillTypes();

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
    private bucketService:BucketsService,
    public router: Router) { }


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
      'bucketWeightSum': ['', Validators.compose(
          [Validators.min(100), Validators.max(100)]
      )]
  });
  }


    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.testSingleSkillType = null;
      }, (reason) => {
        this.testSingleSkillType = null;
      });
      event.stopPropagation();
    }

    addNewSkillType(modal: SkillType){
        this.newSkillType = modal;
        let addedBucket = false;
        console.log(modal.skillTypeName)
        for(let bucketIndex in this.testBuckets){
            if(this.testBuckets[bucketIndex].mappedToSkillType == true){
                addedBucket = true;
                this.bucketWeightSum += this.testBuckets[bucketIndex].weight;
            }
        }
        if(!addedBucket || this.bucketWeightSum == 100){
            console.log("Congrats! The sum of active buckets is: " + this.bucketWeightSum);
            //this.skillTypeService.createSkillType(this.newSkillType.skillTypeName).subscribe();
        }
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

    bucketsAndWeights = [];

    testSkillTypeBuckets: SkillTypeBucket[] = [
        { skillTypeId: 0, bucketId: 0, weight: 50 },
        { skillTypeId: 0, bucketId: 1, weight: 20 },
        { skillTypeId: 0, bucketId: 2, weight: 30 }
    ]
*/
    testSingleSkillType: SkillType;

    editSkillType(skillType){
        this.testSingleSkillType = {
            skillTypeName: skillType.name,
            skillTypeId: skillType.id,
            isActive: true,
            buckets: [this.java, this.oop, this.html],
            weights: [50,30,20]
        }
        this.combineBucketsAndWeights();
    }

    checkContains(bucket){
        if(this.testSingleSkillType){
            return this.testSingleSkillType.buckets.includes(bucket);
        }
        return false;
    }

    addToSkillTypeBuckets(bucket){
        if(this.testSingleSkillType){
            this.testSingleSkillType.buckets.push(bucket);
            this.testSingleSkillType.weights.push(0);
            this.combineBucketsAndWeights();
        }
    }

    removeFromSkillTypeBuckets(bucket){
        if(this.testSingleSkillType){
            for(let singleBucketIndex in this.testSingleSkillType.buckets){
                if(this.testSingleSkillType.buckets[singleBucketIndex] == bucket){
                    this.testSingleSkillType.buckets.splice(Number(singleBucketIndex), 1);
                    this.testSingleSkillType.weights.splice(Number(singleBucketIndex), 1);
                }
            }
            this.combineBucketsAndWeights();
        }
    }

    combineBucketsAndWeights(){
        this.bucketsAndWeights = [];
        for(let index in this.testSingleSkillType.buckets){
            this.bucketsAndWeights.push({"bucket":this.testSingleSkillType.buckets[index], "weight":this.testSingleSkillType.weights[index]});
        }
    }

    clearSkillTypeBuckets(){
        for(let index in this.testBuckets){
            this.testBuckets[index].mappedToSkillType = false;
            this.testBuckets[index].weight = 0;
        }
    }

    checkBucketSum(){
        this.bucketWeightSum = 0;
        for(let index of this.bucketsAndWeights){
            this.bucketWeightSum += index.weight;
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
    this.initFormControl();
  }

}
