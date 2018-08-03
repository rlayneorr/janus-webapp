import {QuestionScore} from '../entities/questionScore';
import {SkillTypeBucketLookUp} from '../entities/skillTypeBucketLookup';
import { CategoryWeight } from '../../settings/screening/entities/Category-Weight';
import { Bucket } from '../../settings/screening/entities/Bucket';
import {Question} from "../../settings/screening/entities/Question";

export class ScoresToBucketsUtil {
  public questionScores: QuestionScore[] = [];
  public weights: CategoryWeight[] = [];
  scoreForQuestion(questionScores: QuestionScore[], question: any) {
    let qs: QuestionScore = questionScores.find(q=>q.questionId == question.questionId);
    if(qs) {
      return qs.score;
    } else {
      return null;
    }
  }
  isWeightForBucket(weights: CategoryWeight[], bucket: Bucket): boolean {
    return weights.find(w=>w.categoryId === bucket.categoryId) !== undefined;
  }
  findWeightForBucket(weights: CategoryWeight[], bucket: Bucket): number {
    if(this.isWeightForBucket(weights, bucket)) {
      return weights.find(w => w.categoryId === bucket.categoryId).weight;
    } else {
      return 0;
    }
  }
  isBucketUsed(bucket: Bucket) {
    console.log("scoreforquestion function:::: ", bucket);
    var f = this.scoreForQuestion;
    if(!bucket.questions) { return false; }
    if(!this.isWeightForBucket(this.weights, bucket)) { return false; }
    if(!this.questionScores.find(q=>undefined!==bucket.questions.find(w=>w.questionId===q.questionId))) {
      return false;
    } else {
      return true;
    }
  }
  singleBucketPerCategory(buckets: Bucket[]) {
    let catIds = Array.from(new Set(buckets.map(b=>b.categoryId)));
    return catIds.map(id=>buckets.filter(b=>b.categoryId==id && b.isActive === true)
      .reduce((b1,b2)=> <Bucket>{
        bucketId: b1.bucketId,
        // skillTypeId: number;
        categoryId : b1.categoryId,
        category: b1.category,
        bucketDescription: b1.bucketDescription + "/" + b2.bucketDescription,
        isActive: true,
        questions: b1.questions.concat(b2.questions)
        }));
  }
    getFinalBreakdown(questionScores: QuestionScore[], buckets: Bucket[], weights: CategoryWeight[]): string[] {
      this.questionScores = questionScores;
      this.weights = weights;
        let usedBuckets = buckets.filter(b=>this.isBucketUsed(b)); // all buckets that actually have asked questions.
        // Need to merge buckets if they have the same categoryId.
        usedBuckets = this.singleBucketPerCategory(usedBuckets);


        // If the total weights from the buckets with answered questions don't add up to 100%, evenly distribute the difference
        let normalizationRatio = 100/usedBuckets.map(b=>this.findWeightForBucket(weights, b)).reduce((a,b)=>a+b);

        var breakdowns: string[] = [];
        let weightedTotal = 0;
        // Loop through all buckets
        usedBuckets.forEach(b => {
          // If at least one question from this bucket was asked, calculate the total weighted score
          // for the bucket augments the points per question by normalized weight
          const weightedBucket = this.findWeightForBucket(weights,b) * normalizationRatio;
          const questionLength = b.questions.filter(q=>this.scoreForQuestion(questionScores,q)!=null).length;
          const questionRatio = 100/(questionLength * 5);

          const rawScore = b.questions.map(q=>this.scoreForQuestion(questionScores,q)).reduce((a,b)=>a+b);

          const bucketScore = rawScore * questionRatio;
          console.log(weights, weightedBucket, questionLength, questionRatio, rawScore, bucketScore);
          // build array of strings to return for copying and pasting into salesforce
          breakdowns.push(Number(bucketScore).toFixed(0) + '% out of weighted bucket score: ' + Number(weightedBucket).toFixed(0) + '%' +
                    ' ' + b.bucketDescription);
          weightedTotal += bucketScore * weightedBucket/100;
        });
        // add the overall score line as a string to the end of the array
        breakdowns.push('Overall: ' + Number(weightedTotal).toFixed(1) + '%');
        // add just the raw overall score for saving to the database to the end of the array
        breakdowns.push(weightedTotal.toString());
        console.log("breakdowns: " + breakdowns);
        return breakdowns;
    }
}
