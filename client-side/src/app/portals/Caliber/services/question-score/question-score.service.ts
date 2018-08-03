import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {QuestionScore} from '../../screening/entities/questionScore';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../../../caliber-client/services/urls/url.service';

/*
Exchanges data between QuestionBank (the table) and Question (the modal) components.
*/
@Injectable()
export class QuestionScoreService {

  constructor(
    private httpClient: HttpClient,
    private urlService: UrlService
    ) { }

  // Used for sharing data between question table and answer modal
  public questionScores: QuestionScore[] = [];

  // questionsQuestionsSource tracks the value of answeredQuestions
  // and allows values to be sent to answeredQuestions
  private questionScoresSource = new BehaviorSubject<QuestionScore[]>(this.questionScores);

  // used to retrieve and populate answeredQuestions in the data table component
  // and answer modal component
  currentQuestionScores = this.questionScoresSource.asObservable();

  // update the array of answered questions
  updateQuestionScores(questionScores: QuestionScore[]) {
    // this.questionScoresSource.next(questionScores);
    this.questionScores = questionScores;
  }

  //get the question score from the database
  getQuestionScore(screeningId: number) : void {
    this.httpClient.get<QuestionScore>(this.urlService.questionScoring.getQuestionScore(screeningId));
  }

  // save the question to the database
  postQuestionScore(question: QuestionScore): void {

    this.httpClient.post<QuestionScore>(this.urlService.questionScoring.scoringQuestion(), {
      score: question.score,
      comment: question.commentary,
      questionId: question.questionId,
      beginTime: question.beginTime,
      screeningId: question.screeningID}).subscribe(data => {
      });

    /*
      return this.httpClient.post<QuestionScore>(url, {
      Score: question.score,
      Comment: question.commentary,
      QuestionID: question.questionId,
      BeginTime: question.beginTime,
      ScreeningID: question.screeningID
      });
    */
  }

}
