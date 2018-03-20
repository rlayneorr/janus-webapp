<<<<<<< HEAD
import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import {trigger,state,style,transition,animate,keyframes}  from '@angular/animations';
import {TrackBucket} from '../entities/TrackBucket';
import {BucketsService} from '../services/buckets.service';
import {Track} from '../entities/Track';
import { TracksService } from '../services/tracks.service';
import {TracksComponent} from '../tracks/tracks.component';
=======
import { Component, OnInit } from '@angular/core';
import { Track } from '../entities/Track';
import { TrackBucket } from '../entities/TrackBucket';
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';

>>>>>>> b68e1f0ba9702740a9250f5659c5e486a44d3b43
@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css'],
})

export class TrackBucketsComponent implements OnInit {
  @Input() track: Track;
  public allTrackBuckets: any[]=[];
  public trackBuckets=[];
  state:string='small';

 
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
  constructor(
    private tracks : TracksComponent
  //  private tracksService: TracksService, 
  //  private route: ActivatedRoute,
  //  private location: Location
  ) { }


  ngOnInit() {
    
    this.track={id:1,name:"Java",isActive:true};
    this.allTrackBuckets=[
      {Name:"HTML/CSS",Weight:30 , isActive:true},
      {Name:"Core Java",Weight:40 ,isActive:true},
      {Name:"SQL",Weight:30,isActive:true}
    ]

    
  
}



  getTracks():any{
    return this.allTrackBuckets;
 }


  
}
