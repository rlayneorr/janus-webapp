import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BucketsService } from '../services/buckets.service';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../entities/Question'
import { Bucket } from '../entities/Bucket'
import { SkillTypesService } from '../services/skillTypes.service';
import {Observable} from 'rxjs/Observable';
import {ScreeningComponent} from '../screening.component'
@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
export class BucketComponent implements OnInit {

  questionList;
  theBucket: Bucket;
  constructor(
    private router: Router,
    private bucketService: BucketsService,
    private modalService: NgbModal,
    private questionService: QuestionsService) {

  }

  ngOnInit() {
    this.questionList = [
      { id: 1, text: "test", answers: ["1", "2"], tagIds: [1, 2], isActive: true }
    ]

  //  this.bucketService.getCurrentBucket();
   console.log("In bucket");
   console.log(this.bucketService.getCurrentBucket());
  this.setBucket();
  }

   open(content) {
    this.modalService.open(content);
    event.stopPropagation();
  }

  getCurrentBucket(){
   this.theBucket=this.bucketService.getCurrentBucket();
    return this.theBucket;

  }
  setBucket(){
    this.theBucket=this.bucketService.getCurrentBucket();
  }

  routeToScreening(){
    this.router.navigate(["Caliber/settings/screening"]);
  }

  /*
  setBucketName updates the bucket name
  @param name : string
  @return void
  Calls bucketService
   */
  setBucketName(name: string) {
    this.bucketService.setName(name);
  }

  /*
  setBucketDescription updates the bucket description
  calls bucket service to update the bucket description
   */
  setBucketDescription(desc: string) {
    this.bucketService.setDescription(desc);
  }


   showQuestionsForThisBucket() {
     let bucketID: number = this.bucketService.getCurrentBucket().bucketId;
    // this.questionService.getBucketQuestions(bucketID);
    // Mock data
    //this.questionService.getBucketQuestions(bucketID);
    this.questionService.getBucketQuestions(bucketID);

  };
}
