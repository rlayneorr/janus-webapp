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
  public allSkillTypes: SkillType[]=[];
  public allBuckets: Bucket[] = [];
  public bucketWeightSum: number = 0;
  public newSkillType: SkillType;
  public error: boolean;

  bucketsAndWeights = [];

  testSkillTypeBuckets: SkillTypeBucket[] = [
      { skillTypeId: 0, bucketId: 0, weight: 50 },
      { skillTypeId: 0, bucketId: 1, weight: 20 },
      { skillTypeId: 0, bucketId: 2, weight: 30 }
  ]

  singleSkillType: SkillType;

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
        console.log(thing);
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
    private bucketsService:BucketsService,
  ) { }

    open(content) {
      this.modalServiceRef = this.modalService.open(content);
      this.modalServiceRef.result.then((result) => {
        this.singleSkillType = null;
        this.bucketsAndWeights = null;
        this.error = null;
      }, (reason) => {
        this.singleSkillType = null;
        this.bucketsAndWeights = null;
        this.error = null;
      });
      event.stopPropagation();
    }

    editSkillType(skillType){
        this.singleSkillType = {
            skillTypeName: skillType.skillTypeName,
            skillTypeId: skillType.id,
            skillTypeDescription: skillType.skillTypeDescription,
            isActive: true,
            buckets: [],
            weights: []
        }
        if(skillType.buckets){
            this.singleSkillType.buckets = skillType.buckets;
            this.singleSkillType.weights = skillType.weights;
        }
        console.log(this.singleSkillType);
        this.combineBucketsAndWeights();
    }

    checkContains(bucket){
        if(this.singleSkillType){
            return this.singleSkillType.buckets.includes(bucket);
        }
        return false;
    }

    addToSkillTypeBuckets(bucket){
        if(this.singleSkillType){
            this.singleSkillType.buckets.push(bucket);
            this.singleSkillType.weights.push(0);
            this.combineBucketsAndWeights();
        }
    }

    removeFromSkillTypeBuckets(bucket){
        if(this.singleSkillType){
            for(let singleBucketIndex in this.singleSkillType.buckets){
                if(this.singleSkillType.buckets[singleBucketIndex] == bucket){
                    this.singleSkillType.buckets.splice(Number(singleBucketIndex), 1);
                    this.singleSkillType.weights.splice(Number(singleBucketIndex), 1);
                }
            }
            this.combineBucketsAndWeights();
        }
    }

    combineBucketsAndWeights(){
        this.bucketsAndWeights = [];
        for(let index in this.singleSkillType.buckets){
            this.bucketsAndWeights.push({"bucket":this.singleSkillType.buckets[index], "weight":this.singleSkillType.weights[index]});
        }
    }

    editNewSkillType(modal: SkillType){
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

    createNewSkillType(modal: SkillType){
        this.newSkillType = modal;
        this.skillTypeService.createSkillType(this.newSkillType).subscribe(results => {
            this.grabAllSkillTypes();
        })
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

    grabAllSkillTypes(){
        this.skillTypeService.getSkillTypes().subscribe(results => {
            this.allSkillTypes = results;
            this.setSkillTypes();
        });
    }

    grabAllBuckets(){
        this.bucketsService.getAllBuckets().subscribe(results =>{
            this.allBuckets = results;
        })
    }

  ngOnInit() {
    this.grabAllSkillTypes();
    this.grabAllBuckets();
  }

}
