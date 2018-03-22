import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillType } from '../entities/SkillType';
import { SkillTypesService } from '../services/skillTypes.service';
import { Bucket } from '../entities/Bucket';
<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
import { TrackBucket } from '../entities/TrackBucket';
import { BucketsService } from '../services/buckets.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  animations: [
    trigger('move', [
      state('center', style({
        transform: 'translateX(0) scaleX(1)'
=======
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import {BucketsService} from'../services/buckets.service';

@Component({
  selector: 'app-skillTypes',
  templateUrl: './skillTypes.component.html',
  styleUrls: ['./skillTypes.component.css'],
  animations:[
    trigger('move',[
      state('center',style({
        transform:'translateX(0) scaleX(1)'
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
      })),
      state('left', style({
        transform: 'translateX(-28%) scaleX(1)'

      })),
<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
      transition('center =>left', animate('300ms ease-in')),
=======
      transition('center =>left',animate('300ms ease-in')),
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
    ]),
  ]
})

export class SkillTypesComponent implements OnInit {

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  public tracks: any[] = [];
  public inactiveTracks: any[] = [];
  public allTracks: any[] = [];
  state: string = 'center';
  state2: string = 'starting';
  show: boolean = false;



  animate(item: any) {
    this.state = (this.state === 'center' ? 'left' : 'center');
    this.show = (this.show === false ? true : false);
=======
  public skillTypes:any[]=[];
  public inactiveSkillTypes:any[]=[];
  public allSkillTypes:any[]=[];
  state:string='center';
  state2:string='starting';
  show:boolean = false;



  animate(item:any){
    this.state='left';
    this.show = true;
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
    this.bucket.name = item.name;
  }


<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  removeElement(item: any) {
    let thing: any;
    for (let i = 0; i < this.allTracks.length; i++) {
      thing = this.allTracks[i];
      if (thing.name == item.name) {
=======
  removeElement(item:any){
    let thing:any;
    for(let i = 0 ;i<this.allSkillTypes.length;i++){
      thing = this.allSkillTypes[i];
      if(thing.name == item.name){
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
        thing.isActive = false;
        this.allSkillTypes[i] = thing;
      }
    }
    this.setSkillTypes();
  }

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  setTracks() {
    let thing: any;
    this.tracks = [];
    this.inactiveTracks = [];
    for (let i = 0; i < this.allTracks.length; i++) {
      thing = this.allTracks[i];
      if (thing.isActive == true) {
        this.tracks[this.tracks.length] = thing;
      } else if (thing.isActive == false) {
        this.inactiveTracks[this.inactiveTracks.length] = thing;
=======
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
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
      }
    }
  }

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
    private trackService: TracksService,
    private bucket: BucketsService) { }
=======
    private skillTypeService: SkillTypesService,
    private bucket:BucketsService) { }
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts


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

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  open(content) {
    this.modalService.open(content);
    event.stopPropagation();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
=======
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
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
    }
  }

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  addNewTrack(modal: Track) {
    this.newTrack = modal;
    let sum = 0;
    let addedBucket = false;
    for (let bucketIndex in this.testBuckets) {
      if (this.testBuckets[bucketIndex].isActive == true) {
        addedBucket = true;
        sum += this.testBuckets[bucketIndex].weight;
      }
    }
    if (!addedBucket || sum == 100) {
      console.log("Congrats! The sum of active buckets is: " + sum);
    } else {
      console.log("The weight has to equal 100");
=======

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
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
    }
    //this.trackService.createTrack(this.newTrack.name).subscribe();
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

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  testTrackBuckets: TrackBucket[] = [
    { trackId: 0, bucketId: 0, weight: 50 },
    { trackId: 0, bucketId: 1, weight: 20 },
    { trackId: 0, bucketId: 2, weight: 30 }
  ]

  testSingleTrack: Track = { id: 0, name: "Java", isActive: true }

  editTrack(track) {
    this.testSingleTrack.name = track.name;
    this.editAllBuckets();
  }

  // set the track buckets within ALL BUCKETS to be already mapped
  editAllBuckets() {
    for (let index in this.testTrackBuckets) {
      for (let allIndex in this.testBuckets) {
        if (this.testTrackBuckets[index].bucketId == this.testBuckets[allIndex].id) {
          this.testBuckets[allIndex].weight = this.testTrackBuckets[index].weight;
          this.testBuckets[allIndex].mappedToTrack = true;
=======
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
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
        }
      }
    }
  }

<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
  addToMapped(bucket) {
    bucket.mappedToTrack = true;
    console.log(this.testBuckets);
  }

  removeFromMapped(bucket) {
    bucket.mappedToTrack = false;

  }
=======
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
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts


  ngOnInit() {
<<<<<<< HEAD:client-side/src/app/portals/Caliber/settings/screening/tracks/tracks.component.ts
    this.allTracks = [
      { name: "Java", isActive: true },
      { name: '.Net', isActive: true },
      { name: 'SDET', isActive: true },
      { name: 'Label', isActive: true },
      { name: "Pega", isActive: false },
      { name: 'Salesforce', isActive: false },
      { name: 'Software', isActive: false }
=======
    this.allSkillTypes = [
      {name:"Java",isActive:true},
      {name:'.Net',isActive:true},
      {name:'SDET',isActive:true},
      {name:'Label',isActive:true},
      {name:"Pega",isActive:false},
      {name:'Salesforce',isActive:false},
      {name:'Software',isActive:false}
>>>>>>> 5cee7d03ed32c12bc7fe77a550c6dbfd3f24b5c1:client-side/src/app/portals/Caliber/settings/screening/skillTypes/skillTypes.component.ts
    ]
    this.setSkillTypes();
    this.initFormControl();
  }

}
