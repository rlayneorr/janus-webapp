import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
//import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Track } from '../entities/Track';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  animations:[
    trigger('move',[
      state('small',style({
        transform:'translateX(0)'
      })),
      state('large',style({
        transform:'translateX(-35%)'
      })),
      transition('small =>large',animate('300ms ease-in')),
    ]),
  ]
})
export class TracksComponent implements OnInit {
  public tracks:any[]=[];
  public inactiveTracks:any[]=[];
  public allTracks:any[]=[];
  state:string='small';

  animate(item:any){
    this.state=(this.state==='small'?'large':'small');
  }
  workPlox(){
    this.state=(this.state==='small'?'large':'small');
  }
  colorDarken(item:any){
   let items= document.getElementsByTagName("td");
   for(let i =0;i<items.length;i++){
     if(items[i].innerHTML === item.Name){
       items[i].parentElement.setAttribute("style","background:#E8E8E8");
     }
   }
  }
  colorLighten(item:any){
   let items= document.getElementsByTagName("td");
   for(let i =0;i<items.length;i++){
     if(items[i].innerHTML === item.Name){
       items[i].parentElement.setAttribute("style","background:white");
     }
   }

  }
  removeElement(item:any){
    let thing:any;
    for(let i = 0 ;i<this.allTracks.length;i++){
      thing = this.allTracks[i];
      if(thing.Name == item.Name){
        thing.Active = false;
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
      if(thing.Active == true){
        this.tracks[this.tracks.length]=thing;
      }else if (thing.Active == false){
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
            console.log("The sum of active buckets is: " + sum);
        } else {
            console.log("The weight has to equal 100");
        }
        //this.trackService.createTrack(this.newTrack.name).subscribe();
        this.initFormControl();
    }

    testBuckets = [
        {"bucket": "Java", "isActive":false, "weight": 0},
        {"bucket": "HTML", "isActive":false, "weight": 0},
        {"bucket": "OOP", "isActive":false, "weight": 0},
        {"bucket": "SQL", "isActive":false, "weight": 0},
    ];

    addToActive(bucket){
        bucket.isActive = true;
        console.log(this.testBuckets);
    }

    removeFromActive(bucket){
        bucket.isActive = false;
    }

  ngOnInit() {

    this.allTracks = [
      {Name:"Java",Active:true},
      {Name:'.Net',Active:true},
      {Name:'SDET',Active:true},
      {Name:'Label',Active:true},
      {Name:"Pega",Active:false},
      {Name:'Salesforce',Active:false},
      {Name:'Software Engineer',Active:false}
    ]
    this.setTracks()


   /* this.tracks = [
      {Name:"Java",Active:true},
      {Name:'.Net',Active:true},
      {Name:'SDET',Active:true},
      {Name:'Label',Active:true},
    ];


    this.inactiveTracks = [
      {Name:"Pega",Active:false},
      {Name:'Salesforce',Active:false},
      {Name:'Software Engineer',Active:false},
    ];*/

    this.initFormControl();
  }

}
