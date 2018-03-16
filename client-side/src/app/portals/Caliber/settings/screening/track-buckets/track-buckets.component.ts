import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track-buckets',
  templateUrl: './track-buckets.component.html',
  styleUrls: ['./track-buckets.component.css']
})
export class TrackBucketsComponent implements OnInit {

  public buckets: any[]=[];
  public activeBuckets: any[]=[];

  constructor() { }

  ngOnInit() {
    this.activeBuckets=[
      {Name:"OOP"},
      {Name:"Spring"}

    ]
  }

}
