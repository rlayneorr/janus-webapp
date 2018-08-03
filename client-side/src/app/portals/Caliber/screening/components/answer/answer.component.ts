import {Component, Input, OnDestroy, OnInit} from '@angular/core';
// Entities
import {QuestionScore} from '../../entities/questionScore';
// Services
import {QuestionService} from '../../../services/question/question.service';
import {QuestionScoreService} from '../../../services/question-score/question-score.service';
// ngbootstrap for modal
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnDestroy {

  @Input() question;
  questionScore: QuestionScore;

  // used to exchange data between the answer modal and question table component
  public questionScores: QuestionScore[];

  constructor(public activeModal: NgbActiveModal, private questionService: QuestionService,
    private questionScoreService: QuestionScoreService) { }

  ngOnInit() {
     var currentQuestionScore = this.questionScoreService.questionScores.find(q=>q.questionId === this.question.questionId);
     this.questionScore = {
       qSID: null, // unused everywhere...
       questionId: this.question.questionId,
       screeningID: +localStorage.getItem('screeningID'),
       score: currentQuestionScore ? currentQuestionScore.score : 0,
       commentary: currentQuestionScore ? currentQuestionScore.commentary : '',
       beginTime: currentQuestionScore ? currentQuestionScore.beginTime : new Date()
     };

    // update answeredQuestions array to match our question service's answeredQuestions array.
    this.questionScoreService.currentQuestionScores.subscribe(
      answeredQuestions => {
        this.questionScores = answeredQuestions;
        console.log("im inside the quesiton service", answeredQuestions);
      }
    )
  }

  ngOnDestroy() {
    this.questionScore = {
      qSID: null,
      questionId: this.question.questionId,
      screeningID: 0,
      score: 0,
      commentary: '',
      beginTime: new Date()
    };
    // update answeredQuestions array to match our question service's answeredQuestions array.
    //this.questionScoreService.currentQuestionScores.subscribe(answeredQuestions => this.questionScores = answeredQuestions);
  }
  // when a score is set and submitted, update the array of questions scores
  saveQuestionScore(): void {
      // allow screeners to update the score of a candidate.
      // Need to check if the current array of question scores is not empty
      if (this.questionScores.length > 0 ) {
        // iterate through each question score
        for (const q of this.questionScores) {
          // if the current question score has the same questionID as the selected question
          if (q.questionId === this.questionScore.questionId) {
            // remove that question score.
            this.questionScores.splice(this.questionScores.indexOf(q), 1);
          }
        }
      }
      console.log(this.questionScore);
      // add the new question score to the array of question scores
      this.questionScores.push(this.questionScore);
      // update our services question score array with the array with this components question score array
      this.questionScoreService.updateQuestionScores(this.questionScores);
      // Save the question score to the database.
      //this.questionScoreService.postQuestionScore(this.questionScore);
  }
}
