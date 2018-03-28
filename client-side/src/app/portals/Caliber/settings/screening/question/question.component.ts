import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../entities/Question';
import { Bucket } from '../entities/Bucket';
import { Tag } from '../entities/Tag';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TAGS } from '../mock-tag';
import {Questions} from '../mock-questions-array'
import {QuestionsService} from '../services/questions.service';
import {TagsService} from '../services/tags.service';
import {trigger,state,style,transition,animate,keyframes} from '@angular/animations';
import {BucketsService} from '../services/buckets.service';
import { SkillType } from '../entities/SkillType';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
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

  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private tagsService: TagsService,
    private questionService: QuestionsService,
    private bucketService: BucketsService) { }

  createQuestion: FormGroup;
  newQuestion: Question;
  allTags: Tag[];
  currentTags: Tag[];
  question:Question;
  sampleAnswers: String[];
  questions: Question[];
  filter: Tag = new Tag();
  currentBucket: Bucket;
  public answersCollapsed = true;
  public tagsCollapsed = true;

  ngOnInit() {
    this.allTags = TAGS;
    this.currentTags = [];
    this.question = new Question();
    this.sampleAnswers = [this.question.sampleAnswer1,this.question.sampleAnswer2,this.question.sampleAnswer3,this.question.sampleAnswer4,this.question.sampleAnswer5];
    this.currentBucket = this.bucketService.getCurrentBucket();
    if(this.currentBucket){
      this.questionService.getBucketQuestions(this.currentBucket.bucketId).subscribe(data=>{
        console.log(data);
        this.questions = (data as Question[]);
      })
    }
    console.log(this.questions);
  }

  /*Used to open a bootstrap modal*/
  open(content) {
    this.modalService.open(content, { windowClass: 'fixed-modal' });
  }
  initFormControl() {
    this.createQuestion = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  /*A currently unused function that will ive the reason for a modal closing*/
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deactivateQuesiton(question){
    if(question.isActive){
      console.log("true");
      this.questionService.deactivateQuestion;
   }
    else{
      console.log("false");
      this.questionService.activateQuestion;
   }
  }

/*A simple function that nullifies the currently selected question to
* be used primarily after a successful save */
  setQuestionNull(){
    this.question = new Question();
    this.sampleAnswers = [];
  }

  /*This function will set the required fields of the selected
  * function to edit to help the  add new question function decide
  * wheather to add or update a question and to fill in the fields
  * with the selected questions sample answers and question text*/
  editQuestion(question){
    this.question = question;
    let i: number = 0;
    this.sampleAnswers = [this.question.sampleAnswer1,this.question.sampleAnswer2,this.question.sampleAnswer3,this.question.sampleAnswer4,this.question.sampleAnswer5];

    //this.currentTags = this.questionService.
    /*
    for(i; i < this.allTags.length; i++){
      let j: number = 0;
      for(j; j < question.tagIds.length; j++){
        if(this.allTags[i]){
          if(this.allTags[i].id==question.tagIds[j]){
            this.currentTags.push(this.allTags[i]);
            this.allTags[i]=null;
          }
        }
      }
    }*/
  }
  //TO DO
  newTag(newTag : string){
    let tag : Tag = new Tag();
    tag.name = newTag;
    //tag.id = this.tagsService.createNewTag(newTag);
    //this.currentTags.push(tag);
  }

  /*This function will check to see if all of the fields are filled
  * and to see if the questio has an Id already to decided wheather
  * to alert the user, add a new question, or to update a current
  * question*/
  addNewQuestion(){
    let newCurrentTagIds : number[] = [];
    let i: number = 0;

    for(i; i < this.currentTags.length; i++){
        newCurrentTagIds.push(this.currentTags[i].id);
    }
    if(this.sampleAnswers.length==5 && this.question.questionText){
      if(this.question.questionId){
        this.questionService.updateQuestion(this.currentBucket.bucketId,this.question, []).subscribe();
        document.getElementById("newQuestionAlert").innerHTML= "Question successfully updated!";
      }
      else{
        this.questionService.createNewQuestion(this.currentBucket.bucketId,this.question,[]).subscribe();
        document.getElementById("newQuestionAlert").innerHTML= "Question successfully saved!";
      }

      this.question = new Question();
      this.sampleAnswers = [];
    }
    else{
      document.getElementById("newQuestionAlert").innerHTML= "You must fill in all fields";
    }
  }

  /*Adds the selected tag to the current tags array and removes it from the all tags array*/
  addTagToQuestion(tag){
    let currentTag: any;
    let newAllTags : Tag[] = [];
    let i: number = 0;

    for(i; i < this.allTags.length; i++)
    {
      currentTag = this.allTags[i];
      if(tag && currentTag){
        if(tag.id != currentTag.id){
          newAllTags.push(currentTag);
        }
      }
    }
    this.allTags = newAllTags;
    this.currentTags.push(tag);
  }

   /*Adds the selected tag to the all tags array and removes it from the current tags array*/
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
