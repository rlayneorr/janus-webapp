import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../entities/Question';
import { Tag } from '../entities/Tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TAGS } from '../mock-tag';
import {Questions} from '../mock-questions-array'
import {QuestionsService} from '../services/questions.service';
import {TagsService} from '../services/tags.service';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
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
export class QuestionComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder, private tagsService : TagsService, questionService: QuestionsService) { }

  createQuestion: FormGroup;
  newQuestion: Question;
  allTags: Tag[];
  currentTags: Tag[];
  question:Question;
  questions: Question[];
  filter: Tag = new Tag();

  ngOnInit() {
    this.allTags = TAGS;
    this.currentTags = [];
    this.question = new Question();
    this.question.answers = [];
    this.questions = Questions;
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
  //ToDo
  deactivateQuestion(question){

  }
  newTag(newTag : string){
    this.tagsService.createNewTag(newTag);
    this.allTags
  }
  addNewQuestion(){
    let newCurrentTagIds : number[] = [];
    let i: number = 0;

    for(i; i < this.currentTags.length; i++)
    {
        newCurrentTagIds.push(this.currentTags[i].id);
    }
    this.question.tagIds= newCurrentTagIds;
    if(this.question.answers.length==5 && this.question.text){
      //questionSerice.createNewQuestion(0,this.question);
      document.getElementById("newQuestionAlert").innerHTML= "Question successfully saved!";
      this.question = new Question();
      this.question.answers = [];
    }
    else{
      document.getElementById("newQuestionAlert").innerHTML= "You must fill in all fields";
    }
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
      }
    }
    this.allTags = newAllTags;
    this.currentTags.push(tag);
  }
  removeTagFromQuestion(tag){
    let currentTag: any;
    let newCurrentTags : Tag[] = [];
    let i: number = 0;

    for(i; i < this.currentTags.length; i++)
    {
      currentTag = this.currentTags[i];


      if(tag.id != currentTag.id){
        newCurrentTags.push(currentTag);
      }
    }
    this.allTags.push(tag);
    this.currentTags = newCurrentTags;
  }
}
