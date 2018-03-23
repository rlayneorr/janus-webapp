import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../entities/Question'
import { Bucket } from '../entities/Bucket'
import { SkillTypesService } from '../services/skillTypes.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {

  /*
  id: number;
    text: string;
    answers: string[];
    tagIds: number[];
    isActive: boolean;
   */
  questionList;
 
  constructor(private bucketsService: BucketsService,
    private modalService: NgbModal,
  private questionService: QuestionsService) {

  }

  ngOnInit() {
    console.log(this.bucketsService.testBucket.name);
    console.log(this.bucketsService.testBucket.description);
    this.questionList=[
      {id:1,text:"test",answers:["1","2"],tagIds:[1,2],isActive:true}
   ]
    // this.testQuestions=[this.question1,this.question2,this.question3,this.question4]
  }

  public open(content) {
    this.modalService.open(content);
    event.stopPropagation();
  }
  public addBucket(name: String, description: String) { }
  public addQuestion() { };
  public editQuesiton(){};
  public deactivateQuestion() {
    
   };
  public showQuestionsForThisBucket(bucketID:number){
   // this.questionService.getBucketQuestions(bucketID); 
   // Mock data
   //this.questionService.getBucketQuestions(bucketID);
   this.questionService.getBucketQuestions(bucketID).subscribe(questions => this.questionList=questions);
    
  };
  /*
  getAllUsers(): void {
        this._httpService.getAllUsers().subscribe(returnedUsers => this.allUsers = returnedUsers);
    } */

  //Edit Question
  //Deactivate Question

}
