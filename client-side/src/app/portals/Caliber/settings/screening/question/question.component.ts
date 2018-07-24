import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Question } from '../entities/Question';
import { Bucket } from '../entities/Bucket';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { QuestionsService } from '../../../services/questions/questions.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BucketsService } from '../services/buckets.service';
import { SkillType } from '../entities/SkillType';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('move', [
      state('center', style({
        transform: 'translateX(0) scaleX(1)'
      })),
      state('left', style({
        transform: 'translateX(-28%) scaleX(1)'
      })),
      transition('center =>left', animate('300ms ease-in')),
    ]),
  ]
})

/**
 * unified create and update question so that it sends the
 * same objects
 *
 * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
 */
export class QuestionComponent implements OnInit {

  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private questionService: QuestionService,
    private questionsService: QuestionsService,
    private bucketService: BucketsService,
    private alertsService: AlertsService) { }

  createQuestion: FormGroup;
  newQuestion: Question;
  question: Question;
  sampleAnswers: string[];
  questions: Question[];
  currentBucket: Bucket;
  public answersCollapsed = true;
  state;

  ngOnInit() {
    this.currentBucket = this.bucketService.getCurrentBucket();
    this.question = new Question();
    this.sampleAnswers = [this.question.sampleAnswer1];
    this.sampleAnswers.push(this.question.sampleAnswer2);
    this.sampleAnswers.push(this.question.sampleAnswer3);
    this.sampleAnswers.push(this.question.sampleAnswer4);
    this.sampleAnswers.push(this.question.sampleAnswer5);
    this.updateQuestions();
  }

  /**
   * Used to open a bootstrap modal
   * Takes in the Id of the modal and launches it
   **/
  open(content) {
    this.modalService.open(content, { windowClass: 'fixed-modal' });
  }

  /**
   * Used to validate the create/update question form
   **/
  initFormControl() {
    this.createQuestion = this.fb.group({
      'name': ['', Validators.required],
    });
  }

  /**
   * A currently unused function that will give the reason for a modal closing
   * May be used later for giving different results based on how a modal is closed
   **/
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * Switches the question sent in as an argument from active to deactive
   * or from deactive to active based on it's current status
   **/
  changeQuestionStatus(question) {
    if (question.isActive) {
      question.isActive = false;
      this.questionService.deactivateQuestion(question.questionId).subscribe();
    } else {
      question.isActive = true;
      this.questionService.activateQuestion(question.questionId).subscribe();
    }
  }

  /**
   * A simple function that nullifies the currently selected question to
   * be used primarily after a successful save
   **/
  setQuestionNull() {
    this.question = new Question();
    this.sampleAnswers = [];
  }

  /**
   * Sets the required fields of the selected
   * function to edit to help the  add new question function decide
   * whether to add or update a question and to fill in the fields
   * with the selected question's sample answers and question text
   **/
  editQuestion(question) {
    this.question = question;
    const i = 0;
    const j = 0;
    this.sampleAnswers = [this.question.sampleAnswer1];
    this.sampleAnswers.push(this.question.sampleAnswer2);
    this.sampleAnswers.push(this.question.sampleAnswer3);
    this.sampleAnswers.push(this.question.sampleAnswer4);
    this.sampleAnswers.push(this.question.sampleAnswer5);
  }

  /**
   * This function will check to see if all of the fields are filled
   * and to see if the question has an Id already to decide whether
   * to alert the user, add a new question, or to update a current
   * question.
   *
   * incharge of updating and adding new question probably needs to be
   * refactored poorly written by creators from hydra. Future sprint
   * please refactor to seperate into two diffrent methods.
   *
   * Last Modifed to set the bucketId in the question model
   * so that it did not need to be passed individually to the question
   * service.
   *
   * @author Alex Pich | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Danny S Chhun | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Michael Adedigba | 1803-USF-MAR26 | Wezley Singleton
   *
   * @author Pedro De Los Reyes | 1803-USF-MAR26 | Wezley Singleton
   *
   **/
  addNewQuestion() {
    if (this.sampleAnswers.length === 5 && this.question.questionText) {
      if (this.question.questionId) {
        this.question.sampleAnswer1 = this.sampleAnswers[0];
        this.question.sampleAnswer2 = this.sampleAnswers[1];
        this.question.sampleAnswer3 = this.sampleAnswers[2];
        this.question.sampleAnswer4 = this.sampleAnswers[3];
        this.question.sampleAnswer5 = this.sampleAnswers[4];
        this.questionService.updateQuestion(this.question).subscribe(data => {
          this.updateQuestions();
        });
        this.updatedSuccessfully();
      } else {
        this.question.sampleAnswer1 = this.sampleAnswers[0];
        this.question.sampleAnswer2 = this.sampleAnswers[1];
        this.question.sampleAnswer3 = this.sampleAnswers[2];
        this.question.sampleAnswer4 = this.sampleAnswers[3];
        this.question.sampleAnswer5 = this.sampleAnswers[4];
        this.question.bucketId = this.currentBucket.bucketId;
        this.questionService.createNewQuestion(this.question).subscribe(data => {
          this.updateQuestions();
        });
        this.savedSuccessfully();
      }
      this.setQuestionNull();
      this.sampleAnswers = [];
    } else {
      this.savedUnsuccessfull();
    }
  }




  deleteQuestion(question):void {
    //this.questionService.deleteQuestion(this.question.questionId);
    console.log("delete")
  }
 
  /**
   * Used to populate the current question and the current tags with a selected question to be
   * edited.
   **/
  updateQuestions() {
    if (this.currentBucket) {
      this.questionService.getBucketQuestions(this.currentBucket.bucketId).subscribe(data => {
        this.questions = (data as Question[]);
      });
      
    }
  }

  
  
  savedSuccessfully() {
    this.alertsService.success('Saved successfully');
  }

  updatedSuccessfully() {
    this.alertsService.success('Updated successfully');
  }

  savedUnsuccessfull() {
    this.alertsService.error('All Fields Must be Filled');
  }

}
