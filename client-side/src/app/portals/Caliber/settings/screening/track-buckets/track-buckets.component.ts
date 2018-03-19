import {ActivatedRoute} from '@angular/router';
import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import {TrackBucket} from '../entities/TrackBucket';
import {BucketsService} from '../services/buckets.service';
import {Track} from '../entities/Track';
import { TracksService } from '../services/tracks.service';


@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css'],
})
export class TrackBucketsComponent 
implements OnInit {
  @Input() track: Track;
  public allTrackBuckets: any[]=[];
  public trackBuckets=[];


  constructor(
    private tracksService: TracksService, 
    private route: ActivatedRoute,
  private location: Location) { }

  ngOnInit() {
    //this.track={id:1,name:"Java",isActive:true};
   
    this.getTrack();
    //this.setTrackBuckets()

    this.allTrackBuckets=[
   
    ]
  }
 
  getTrack(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.tracksService.getTrackById(id).subscribe( track => this.track=track);
  }
  

}
