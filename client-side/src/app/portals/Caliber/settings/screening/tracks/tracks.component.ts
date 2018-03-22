import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
//import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
//activate tracks
//inactive should be a minus
// storing data in a service
// creating track and adding buckets
//variable for current track name
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Track } from '../entities/Track';
import { TracksService } from '../services/tracks.service';
import { Bucket } from '../entities/Bucket';
import { TrackBucket } from '../entities/TrackBucket';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  animations:[
    trigger('move',[
      state('center',style({
        transform:'translateX(0) scaleX(1)'
      })),
      state('left',style({
        transform:'translateX(-28%) scaleX(1)'

      })),
      transition('center =>left',animate('300ms ease-in')),
    ]), 
  ]
})

export class TracksComponent implements OnInit {

  public tracks:any[]=[];
  public inactiveTracks:any[]=[];
  public allTracks:any[]=[];
  state:string='center';
  state2:string='starting';
  show:boolean = false;



  animate(item:any){
    this.state=(this.state==='center'?'left':'center');
    this.show=(this.show=== false?true:false);  
  }
  colorDarken(item:any){
   let items= document.getElementsByTagName("li");
   for(let i =0;i<items.length;i++){
     if(items[i].innerText === item.name){
       items[i].parentElement.setAttribute("style","background:#E8E8E8;list-style-type:none");
     }
   }
  }

  colorLighten(item:any){
   let items= document.getElementsByTagName("li");
   for(let i =0;i<items.length;i++){
     if(items[i].innerText === item.name){
       items[i].parentElement.setAttribute("style","background:white;list-style-type:none");
     }
   }
  }

  removeElement(item:any){
    let thing:any;
    console.log(item);
    for(let i = 0 ;i<this.allTracks.length;i++){
      thing = this.allTracks[i];
      if(thing.name == item.name){
        thing.isActive = false;
        this.allTracks[i] = thing;
      }
    }
    this.setTracks();
  }
  
  setTracks(){
    let thing:any;
    this.tracks = [];
    this.inactiveTracks = [];
    for(let i = 0; i<this.allTracks.length;i++){
      thing = this.allTracks[i];
      if(thing.isActive == true){
        this.tracks[this.tracks.length]=thing;
    }else if (thing.isActive == false){
        this.inactiveTracks[this.inactiveTracks.length]=thing;
      }
    }
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder, private trackService: TracksService) { }


  createTrack: FormGroup;
  newTrack: Track;

  /**
   * initialize form control for validations
   *
   * @memberof TracksComponent
   */
  initFormControl() {
    this.createTrack = this.fb.group({
      'name': ['', Validators.required],
    });
  }

    open(content) {
      this.modalService.open(content);
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

    addNewTrack(modal: Track){
        this.newTrack = modal;
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

    testTrackBuckets: TrackBucket[] = [
        { trackId: 0, bucketId: 0, weight: 50 },
        { trackId: 0, bucketId: 1, weight: 20 },
        { trackId: 0, bucketId: 2, weight: 30 }
    ]

    testSingleTrack: Track = {id: 0, name: "Java", isActive: true}

    editTrack(track){
        this.testSingleTrack.name = track.name;
        this.editAllBuckets();
    }

    // set the track buckets within ALL BUCKETS to be already mapped
    editAllBuckets(){
        for(let index in this.testTrackBuckets){
            for(let allIndex in this.testBuckets){
                if(this.testTrackBuckets[index].bucketId == this.testBuckets[allIndex].id){
                    this.testBuckets[allIndex].weight = this.testTrackBuckets[index].weight;
                    this.testBuckets[allIndex].mappedToTrack = true;
                }
            }
        }
    }

    addToActive(bucket){
        bucket.isActive = true;
        console.log(this.testBuckets);
    }

    removeFromActive(bucket){
        bucket.isActive = false;
    }

  ngOnInit() {
    this.allTracks = [
      {name:"Java",isActive:true},
      {name:'.Net',isActive:true},
      {name:'SDET',isActive:true},
      {name:'Label',isActive:true},
      {name:"Pega",isActive:false},
      {name:'Salesforce',isActive:false},
      {name:'Software',isActive:false}
    ]
    this.setTracks()
    console.log(this.inactiveTracks);
    this.initFormControl();
  }

}
