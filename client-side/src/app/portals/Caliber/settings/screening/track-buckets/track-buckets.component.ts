import { Component, OnInit } from '@angular/core';
import { Track } from '../entities/Track';
import { TrackBucket } from '../entities/TrackBucket';
import { Bucket } from '../entities/Bucket';
import { BucketsService } from '../services/buckets.service';

@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css']
})

export class TrackBucketsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
