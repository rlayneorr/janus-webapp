import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScreeningService} from '../../../services/screening/screening.service';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {SkillTypeBucketService} from '../../../services/skillTypeBucketLookup/skill-type-bucket.service';
import {QuestionScoreService} from '../../../services/question-score/question-score.service';
import {QuestionScore} from '../../entities/questionScore';
import {ScoresToBucketsUtil} from '../../util/scoresToBuckets.util';
import {AlertsService} from '../../../services/alerts.service';
import {SoftSkillsViolationService} from '../../../services/soft-skills-violation/soft-skills-violation.service';
import {SoftSkillViolation} from '../../entities/softSkillViolation';
import {Subscription} from 'rxjs/Subscription';
import { Bucket } from '../../../settings/screening/entities/Bucket';
import { CategoryWeight } from '../../../settings/screening/entities/Category-Weight';
import { SkillType } from '../../../settings/screening/entities/SkillType';
import { Category } from '../../../entities/Category';
import { QuestionsToBucketsUtil } from '../../util/questionsToBuckets.util';
import { QuestionsService } from '../../../services/questions/questions.service';
import { Question } from '../../../settings/screening/entities/Question';
import {SkillTypesService} from "../../../services/skillTypes.service";
import {BucketsService} from "../../../services/buckets.service";
import {CategoryWeightsService} from "../../../services/weight.service";

@Component({
  selector: 'app-final-report',
  templateUrl: './final-report.component.html',
  styleUrls: ['./final-report.component.css']
})

/*
A simple text summary of how the candidate performed
in each category on technical skills,the overall feedback thereon,
and if the candidate passed or failed their soft skills evaluation.
Screener can copy the summary to the clipboard, and return to the candidate list.
*/

export class FinalReportComponent implements OnInit, OnDestroy {

public candidateName: string;
softSkillString: string;
bucketStringArray: string[] = [];
buckets: Bucket[] = [];
weights: CategoryWeight[] = [];
skillType: SkillType;
categories: Category[] = [];
overallScoreString: string;
generalNotesString: string;
allTextString: string;

questionScores: QuestionScore[];
softSkillViolations: SoftSkillViolation[];
public checked: string;
subscriptions: Subscription[] = [];

  constructor(
    private screeningService: ScreeningService,
    private candidateService: CandidateService,
    private skillTypeBucketService: SkillTypeBucketService,
    private skillTypesService: SkillTypesService,
    private bucketsService: BucketsService,
    private categoryWeightsService: CategoryWeightsService,
    private questionService: QuestionsService,
    private questionScoreService: QuestionScoreService,
    private questionsToBucketsUtil: QuestionsToBucketsUtil,
    private scoresToBucketsUtil: ScoresToBucketsUtil,
    private alertsService: AlertsService,
    private softSkillsViolationService: SoftSkillsViolationService
  ) { }
  public candidateTrack: Object;

  ngOnInit() {
    this.checked = 'false';
    this.categories = this.screeningService.getSelectedCategories();
    this.bucketsService.getAllBuckets().subscribe((bucketArray: Bucket[]) => {
      this.buckets = bucketArray;
      this.getQuestions();
    });
  }
    getQuestions(){
      this.buckets.forEach((bucket)=>{
        this.questionService.getBucketQuestions(bucket.bucketId).subscribe((questionArray: Question[])=>{
          bucket.questions = questionArray;

        })
      });
      this.getCandidate();
    }
    getCandidate(){
    console.log("Return Buckets: ", this.buckets);
    this.candidateName = this.candidateService.getSelectedCandidate().name;
    this.softSkillString = 'Soft Skills: ' + this.screeningService.softSkillsResult;
    this.allTextString = this.softSkillString + '\n';
    const trackId = parseInt((localStorage.getItem('candidateTrack')), 10);

    this.skillTypesService.getSkillTypeById(trackId).subscribe(skill =>{
      this.skillType = skill;
      console.log("skillType: ", this.skillType.categories);
      this.getSkillType();
    });
  };
    getSkillType(){
      console.log("in skill type");
      this.skillType.categories.forEach(category => {
      console.log("SkillTypeId: " + this.skillType.skillTypeId +" CategoryId: "+ category.categoryId);

      this.categoryWeightsService.getWeightByIds(this.skillType.skillTypeId, category.categoryId)
      .subscribe((weight) => {
        this.weights.push(weight);
        console.log("weights: ", this.weights);
        this.getWeights();
      }
    )
    });
  }

    getWeights(){
    console.log("weights: ", this.weights);
    this.questionScores = this.questionScoreService.questionScores;
      this.finalBreakdown();
  }

      finalBreakdown(){
        console.log(this.questionScores);
        this.bucketStringArray =
          this.scoresToBucketsUtil.getFinalBreakdown(this.questionScores, this.buckets, this.weights);

        // Set the composite score in the screening service
        this.screeningService.compositeScore = +this.bucketStringArray[this.bucketStringArray.length - 1];
        this.bucketStringArray.splice(this.bucketStringArray.length - 1, 1);

        this.overallScoreString = this.bucketStringArray[this.bucketStringArray.length - 1];
        this.bucketStringArray.splice(this.bucketStringArray.length - 1, 1);

        this.bucketStringArray.forEach(bucketString => {
          this.allTextString += bucketString + '\n';
        });
        this.allTextString += this.overallScoreString + '\n';

    // this.overallScoreString = "Overall: 71%";
    this.generalNotesString = this.screeningService.generalComments;
    this.allTextString += 'comments: "' + this.generalNotesString + '"';

    this.screeningService.endScreening(this.generalNotesString);
    this.subscriptions.push(this.softSkillsViolationService.currentSoftSkillViolations.subscribe(
      softSkillViolations => {this.softSkillViolations = softSkillViolations}

    ))};

  // Used for copying the data to the clipboard (this is done using ngx-clipboard)
  copyToClipboard() {
    this.checked = 'true';
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.allTextString;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertsService.success('Copied to Clipboard');
  }

  ngOnDestroy() {
    // Called once before the instance is destroyed.
    // Empty the appropriate arrays, clean local storage and unsubscribe from subscriptions in this component.
    this.questionScores = [];
    this.questionScoreService.updateQuestionScores(this.questionScores);
    this.softSkillViolations = [];
    this.softSkillsViolationService.updateSoftSkillViolations(this.softSkillViolations);
    localStorage.removeItem('screeningID');
    localStorage.removeItem('scheduledScreeningID');
    this.subscriptions.forEach(s => s.unsubscribe);
  }
}
