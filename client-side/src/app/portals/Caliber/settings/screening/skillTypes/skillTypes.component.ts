import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
  public bucketWeightSum: number = 0;
  public newSkillType: SkillType;
  public error: boolean;

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

  testSingleSkillType: SkillType;

  modalServiceRef;

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
  //  console.log(this.skillTypes.length);
    console.log(this.skillTypes);
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private skillTypeService: SkillTypesService,
    private bucket:BucketsService,
  ) { }

    open(content) {
      this.modalServiceRef = this.modalService.open(content);
      this.modalServiceRef.result.then((result) => {
        this.testSingleSkillType = null;
        this.bucketsAndWeights = null;
        this.error = null;
      }, (reason) => {
        this.testSingleSkillType = null;
        this.bucketsAndWeights = null;
        this.error = null;
      });
      event.stopPropagation();
    }

    editSkillType(skillType){
        this.testSingleSkillType = {
            skillTypeName: skillType.skillTypeName,
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

    addNewSkillType(modal: SkillType){
        this.newSkillType = modal;
        let addedBucket = false;
        console.log(modal.skillTypeName);
        this.bucketWeightSum = 0;
        if(this.bucketsAndWeights){
            for(let index in this.bucketsAndWeights){
                addedBucket = true;
                this.bucketWeightSum += this.bucketsAndWeights[index].weight;
            }
        }
        if(this.bucketWeightSum == 100){
            this.modalServiceRef.close();
        }
        else {
            this.error = true;
        }
    }

    checkBucketSum(){
        this.bucketWeightSum = 0;
        for(let bucket of this.bucketsAndWeights){
            this.bucketWeightSum += bucket.weight;
        }
        if(this.bucketWeightSum == 100){
            this.error = false;
        } else {
            this.error = true;
        }
    }

  ngOnInit() {
    this.allSkillTypes = [
      {skillTypeName:"Java",isActive:true},
      {skillTypeName:'.Net',isActive:true},
      {skillTypeName:'SDET',isActive:true},
      {skillTypeName:'Label',isActive:true},
      {skillTypeName:"Pega",isActive:false},
      {skillTypeName:'Salesforce',isActive:false},
      {skillTypeName:'Software',isActive:false}
    ]
    this.setSkillTypes();
  }

}
