import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  public tracks:any[];
  public inactiveTracks: any[];
  constructor() { }

  ngOnInit() {
    this.tracks = [
      {Name:"Java"},
      {Name:'.Net'},
      {Name:'SDET'},
      {Name:'Label'},
    ];


    this.inactiveTracks = [
      {Name:"Pega"},
      {Name:'Salesforce'},
      {Name:'Software Engineer'},
    ];
    
  }

}