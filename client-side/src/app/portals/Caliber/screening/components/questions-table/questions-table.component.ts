import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
// Entities
import {Question} from '../../entities/question';
import {Bucket} from '../../../settings/screening/entities/Bucket';
import {QuestionScore} from '../../entities/questionScore';
// Services
// import { QuestionService } from '../../services/question/question.service';
import {QuestionScoreService} from '../../../services/question-score/question-score.service';
import {SkillTypeBucketService} from '../../../services/skillTypeBucketLookup/skill-type-bucket.service';
import {QuestionsService} from '../../../services/questions/questions.service'
import {BucketsService} from '../../../services/buckets.service'
// Utility Class (setting up buckets and questions based on selected tags)
import {QuestionsToBucketsUtil} from '../../util/questionsToBuckets.util';
// Modal for answering the question
import {AnswerComponent} from '../answer/answer.component';
// ngbootstrap modal
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScreeningService} from '../../../services/screening/screening.service';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Category} from '../../../entities/Category';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})

/*
After the candidate has given their introduction,
the screener will proceed to the question-and-answer part of the interview.
A list of questions will be fetched from the server / database,
based on the skills that the screener input on the candidate introduction page.
Screener will be able to see a set of category tabs,
each of which has a set of questions in a table.

Screener has the ability to navigate between tabs ad nauseam,
asking whichever questions they desire. When a screener asks a question,
it will invoke an instance of the question component.

Possible change for the future there are no programmatic constraints
on how many questions a screener can ask, nor are there any constraints
on what the proportion of questions must be (x% Java, y% HTML, z% SQL, etc).
Future iterations may change this.
*/
//screening service.getSelectedCategories
export class QuestionsTableComponent implements OnInit, OnDestroy {
  newBucket: Bucket= {
    bucketId: 0,
    categoryId : 0,
    category: '',
    bucketDescription: '',
    isActive: false,
    questions: [],

  };
  // Used to display the categories
  questionBuckets: Bucket[];
  currentCategories: Category[];
  buckets: Bucket[];


  //the bucket ids
  currentBucketId: number;
  //the categories selecetd
  selectedCategories: Category[];
  // holds the current category. Used to control
  // which questions are displayed in the questions table.
  currentCategory: Bucket;

  // value entered enables finish button
  generalComment: string;

  // Array of questions answered during the interview
  questionScores: QuestionScore[] = [];

  // The candidate's name
  candidateName: string;

  // used on ngOnDestroy. Will unsubscribe from all observables
  // to prevent memory leaks
  subscriptions: Subscription[] = [];

  public isScored(question: Question) {
    return this.questionScoreService.questionScores.find(q=>q.questionId===question.questionId) !== undefined;
  }
  constructor(
    private questionsService: QuestionsService,
    private questionScoreService: QuestionScoreService,
    private questionsToBucketsUtil: QuestionsToBucketsUtil,
    private modalService: NgbModal,
    private screeningService: ScreeningService,
    private candidateService: CandidateService,
    private skillTypeBucketService: SkillTypeBucketService,
    private bucketsService: BucketsService
  ) {}

  ngOnInit() {

    //get the categories selected on the last page
   this.currentCategories = this.screeningService.getSelectedCategories();
   console.log("selected Categories", this.currentCategories);
   //get all the buckets
    this.bucketsService.getAllBuckets().subscribe((data)=> {
      console.log(this.currentCategories);
      console.log("buckets for category display", data);
      const cids: Number[] = this.currentCategories.map(c=>c.categoryId);
      this.buckets = data.filter(b=>{
        return cids.includes(b.categoryId) && b.isActive;
      });
      console.log("our buckets are....: ", this.buckets);

      // Add questions to our bucket, I don't think it matters if the questions
      // are added to the bucket, since we don't modify that service....
      this.buckets.map(b=>{
        this.questionsService.getBucketQuestions(b.bucketId).subscribe(questions => {
          b["questions"] = questions as Question[];
        });
      });
      this.questionBuckets = this.buckets;
      this.currentCategory = this.questionBuckets[0];
      this.questionsToBucketsUtil.setReturnBuckets(this.buckets);
    });

    //get the questions for the buckets on the categories selected from the buckets
    //this.questionsService.getBucketQuestions(404).subscribe((resp) => {
    //  this.questionBuckets = resp as Bucket[];console.log("hello", resp)});

    //
    // use skillTypeBucketLookup that provides array of buckets and array of weights
    // this.subscriptions.push(this.skillTypeBucketService.
    //   //looking this up by resourceId needs to be redone. skilltypebucket service may e the wrong thing to use here. -michael
    //   getSkillTypeBuckets(1, this.currentCategory.categoryId).subscribe(bucketsWithWeights => {

    //   const myBuckets: Bucket[] = [];
    //   for ( const e of bucketsWithWeights.bucket) {
    //     myBuckets.push(
    //       {
    //         bucketId: e.bucketId,
    //         categoryId: e.categoryId,
    //         category: e.category,
    //         bucketDescription: e.bucketDescription,
    //         isActive: e.isActive,
    //         questions: e.Question,
    //       }
    //     );
    //   }}

    //   this.skillTypeBucketService.bucketsByWeight = {
    //     skillTypeBucketLookupID: bucketsWithWeights.skillTypeBucketLookupID,
    //     skillType: JSON.parse(JSON.stringify(bucketsWithWeights.skillType)),
    //     buckets: myBuckets,
    //     weights: JSON.parse(JSON.stringify(bucketsWithWeights.weight)),
    //   };
    //   /**
    //    * Disabled because relationship between question and skill microservice relationship
    //    * needs to be reworked on the serverside
    //    */
    //   this.subscriptions.push(this.questionService.getQuestions().subscribe(allQuestions => {
    //     this.questionBuckets = this.questionsToBucketsUtil.saveQuestions(allQuestions, this.skillTypeBucketService.bucketsByWeight);
    //     this.skillTypeBucketService.bucketsByWeight.buckets = JSON.parse(JSON.stringify(this.questionBuckets));

    //     if (this.questionBuckets.length > 0) {
    //       this.currentCategory = this.questionBuckets[0];
    //     }
    //   }));
    // }));

    // this.candidateName = this.candidateService.getSelectedCandidate().name

    // // update the answeredQuestions variable in our service to track the
    // // questions that have been given a score by the screener.
    // this.subscriptions.push(this.questionScoreService.currentQuestionScores.subscribe(
    //   questionScores => (this.questionScores = questionScores)
    // ));
    }

  // Unsubscribe to prevent memory leaks when component is destroyed
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe);
    if (this.questionBuckets !== undefined) {
      for (const bucket of this.questionBuckets) {
        //bucket.questions = [];
      }
    }
  }
  // sets the current category, allowing for dynamic change
  // of the questions being displayed.
  setBucket(bucketId: number) {
    this.currentCategory = this.questionBuckets.find(b=>b.bucketId === bucketId);
  }

  open(question: Question) {
    const modalRef = this.modalService.open(AnswerComponent);
    modalRef.componentInstance.question = question;
  }

  // used to display the green question mark on answered questions
  isAnsweredQuestion(question: Question): boolean {
    // iterate through the array of question scores
    for (const q of this.questionScores) {
      // if the current question score's question ID matches the question parameter's id
      if (q.questionId === question.questionId) {
        return true;
      }
    }
  }

  // Method that controls whether the user is allowed to click the submit button
  submitAllowed(): boolean {
    let allowed = true;

    if (this.generalComment) {
      if (this.generalComment.length < 1) {
        allowed = false;
      }
    } else {
      allowed = false;
    }
    return !allowed;
  }

  updateQuestionScores()
  {
    this.questionScores = this.questionScoreService.questionScores;
  }

  // Method that calls the service method, submitting the screener's general comments.
  saveFeedback() {
    this.updateQuestionScores();
    this.questionScores.forEach(element => {
      this.questionScoreService.postQuestionScore(element);
    });
    this.screeningService.generalComments = this.generalComment;
    this.screeningService.submitGeneralComment();
    console.log(this.questionScores);
  }
}
