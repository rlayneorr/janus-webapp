import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../entities/Question';
import { Tag } from '../entities/Tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TAGS } from '../mock-tag';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {
  
  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  createQuestion: FormGroup;
  newQuestion: Question;
  allTags: Tag[];
  currentTags: Tag[];

  ngOnInit() {
    this.allTags = TAGS;
    this.currentTags = [];
  }
  open(content) {
    this.modalService.open(content);
  }
  initFormControl() {
    this.createQuestion = this.fb.group({
      'name': ['', Validators.required],
    });
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
  addNewQuestion(modal: Question){
    this.newQuestion = modal;
    this.initFormControl;
  }
  addTagToQuestion(tag){
    let currentTag: any;
    let newAllTags : Tag[] = [];
    let i: number = 0;
    for(i; i < this.allTags.length; i++)
    {
      currentTag = this.allTags[i];
      if(tag.id != currentTag.id){
        newAllTags.push(currentTag);
        //this.currentTags.splice(i,1);
        console.log(currentTag.id);
      } 
    }
    this.allTags = newAllTags;
    this.currentTags.push(tag);
  }
  removeTagFromQuestion(tag){
    let currentTag: any;
    let newCurrentTags : Tag[] = [];
    let i: number = 0;

    console.log(this.currentTags);
    console.log(tag.id);
    for(i; i < this.currentTags.length; i++)
    {
      currentTag = this.currentTags[i];
      
      
      if(tag.id != currentTag.id){
        newCurrentTags.push(currentTag);
        //this.currentTags.splice(i,1);
        console.log(currentTag.id);
      } 
    }
    this.allTags.push(tag);
    this.currentTags = newCurrentTags;
    console.log(this.currentTags);
  }
}

