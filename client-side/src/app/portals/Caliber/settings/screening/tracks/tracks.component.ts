import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
//import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
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
  public tracks:any[];
  public inactiveTracks: any[];
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
    for(let i = item;i<this.tracks.length-1;i++){
        let currentPostion = this.tracks[i];
        let nextPosition = this.tracks[i+1];

        this.tracks[i] = nextPosition;
        this.tracks[i+1]= currentPostion;

    };
    this.inactiveTracks[this.inactiveTracks.length]=this.tracks[this.tracks.length-1];
    this.tracks.pop();
    /*
    for(let i = this.tracks.indexOf(item);i<this.tracks.length;i++){
        this.tracks.pop();
    }
    this.inactiveTracks[this.inactiveTracks.length]={Name:item}
*/
  }
  constructor() { }

  ngOnInit() {
    this.tracks = [
      {Name:"Java",Active:true},
      {Name:'.Net',Active:true},
      {Name:'SDET',Active:true},
      {Name:'Label',Active:true},
    ];


    this.inactiveTracks = [
      {Name:"Pega",Active:false},
      {Name:'Salesforce',Active:false},
      {Name:'Software Engineer',Active:false},
    ];
    
  }

}