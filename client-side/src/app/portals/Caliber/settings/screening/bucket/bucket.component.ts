import { Component, OnInit,OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BucketsService } from '../services/buckets.service';
import {QuestionsService} from '../services/questions.service';
import {Question} from '../entities/Question'
@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css'],
})
export class BucketComponent implements OnInit {

  constructor(private bucketsService: BucketsService) {
    
  }

  ngOnInit() {
   // this.testQuestions=[this.question1,this.question2,this.question3,this.question4];


  }

 
  public getQuestions(){
    

  }
}
