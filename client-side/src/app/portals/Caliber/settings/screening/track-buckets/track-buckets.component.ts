import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes}  from '@angular/animations';
import { TrackBucket } from '../entities/TrackBucket';
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';
import { Track } from '../entities/Track';
import { TracksService } from '../services/tracks.service';
import { TracksComponent } from '../tracks/tracks.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css'],
})

export class TrackBucketsComponent implements OnInit {

  @Input() track: Track;
  allTrackBuckets: any[] = [];
  trackBuckets = [];
  testBuckets: any[] = [];
  state: string = 'small';
  bucketName:string = null;

  constructor(
    private tracks : TracksComponent,
    private modalService: NgbModal,
    private tracksService: TracksService,
    private router: Router,
    private bucketService:BucketsService,
    //  private route: ActivatedRoute,
    //  private location: Location
  ) { }

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.track = {id: 1, name: "Java", isActive: true};
    this.allTrackBuckets = [
      {Name: "HTML/CSS", Weight: 30, isActive: true},
      {Name: "Core Java", Weight: 40, isActive: true},
      {Name: "SQL", Weight: 30, isActive: true}
    ]

    this.testBuckets=["test1","test2","test3"]

    this.bucketName = this.bucketService.name;

}


getTracks() {
    return this.allTrackBuckets;
  }
 /*
 getTrackBuckets(id:number): Observable<TrackBucket>{
   return this.tracksService.getBucketsByTrack(id);
 }*/
  //item: any
  routeToBucket(item:any){
  //  this.router.navigateByUrl("/Caliber/settings/category");
   this.router.navigate(["Caliber/settings/category"]);
 //   console.log(item);
 //   console.log("routing to category");
  }


  showAddCategoryModal(){
  //  console.log("Show 'Add category' modal button clicked");
  }

}
