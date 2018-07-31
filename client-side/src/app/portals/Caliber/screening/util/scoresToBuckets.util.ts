import { QuestionScore } from '../entities/questionScore';
import { SkillTypeBucketLookUp } from '../entities/skillTypeBucketLookup';
import { CategoryWeight } from '../../settings/screening/entities/Category-Weight';
import { Bucket } from '../../settings/screening/entities/Bucket';

export class ScoresToBucketsUtil {

    getFinalBreakdown(questionScores: QuestionScore[], buckets: Bucket[], weights: CategoryWeight[]): string[] {
        const bucketNames: string[] = [];
        const totals: number[] = [];
        const scores: number[] = [];
        let totalScore: number = 0;
        let bucketIndex = 0;
        let questionsAsked;
        let totalWeights = 0;
        let totalBuckets = 0;
        console.log("QuestionScores: " + questionScores, "Buckets: " + buckets, "Weights: " + weights);
        // Loop through the buckets
        
        //buckets.forEach(thisBucket => {
            // questionsAsked = 0;
            // totals[bucketIndex] = 0;
            // scores[bucketIndex] = 0;
            // if (thisBucket.questions != null) {
            //     // If the questions array in this bucket is populated, loop through the question
            //     thisBucket.questions.forEach(thisQuestion => {
            //         const matchingQuestion = questionScores.find(function(element) {
            //             return element.questionId === thisQuestion.questionId;
            //         });
            //         // If this question has been answered, add it to the total
            //         if (matchingQuestion) {
            //             questionsAsked++;
            //             totals[bucketIndex] += 5;
            //             scores[bucketIndex] += matchingQuestion.score;
            //         }
            //     });
            // }
            
            // If questions were answered from this bucket, mark bucket as used
        //     if (questionsAsked > 0) {
        //         bucketNames[bucketIndex] = thisBucket.category;
        //         totalWeights += weights[bucketIndex].weight;
        //         totalBuckets++;
        //     // If no questions from this bucket were asked, ignore in final calculations
        //     } else {
        //         bucketNames[bucketIndex] = 'skip';
        //     }
        //     bucketIndex++;
        // });

        
        if (questionScores != null){
            questionsAsked = 0;
            totals[bucketIndex] = 0;
            scores[bucketIndex] = 0;
            questionScores.forEach(question => {
                console.log("Score: " + question.score);
                questionsAsked++;
                totalScore += question.score;
            });
        }
        let normalizeWeight = 0;
        // If the total weights from the buckets with answered questions don't add up to 100%, evenly distribute the difference
        if (totalWeights < 100) {
            normalizeWeight = (100 - totalWeights) / totalBuckets;
        }
        const breakdowns: string[] = [];
        let breakdownIndex = 0;
        let weightedTotal = 0;
        // Loop through all buckets
        bucketNames.forEach(thisSummary => {
            // If at least one question from this bucket was asked, calculate the total weighted score for the bucket
            if (bucketNames[breakdownIndex] !== 'skip') {
                // augments the points per question by normalized weight
                const weightedbucket = (weights[breakdownIndex].weight + normalizeWeight);
                const weightedscore = scores[breakdownIndex] / totals[breakdownIndex] * weightedbucket;


                // build array of strings to return for copying and pasting into salesforce
                breakdowns.push(Number(weightedscore).toFixed(0) + '/' + Number(weightedbucket).toFixed(0) +
                    ' ' + bucketNames[breakdownIndex]);
                weightedTotal += (scores[breakdownIndex] / totals[breakdownIndex]) *
                    (weights[breakdownIndex].weight + normalizeWeight);
            }
            breakdownIndex++;
        });
        // add the overall score line as a string to the end of the array
        breakdowns.push('Overall: ' + Number(weightedTotal).toFixed(1) + '%');
        // add just the raw overall score for saving to the database to the end of the array
        breakdowns.push(weightedTotal.toString());
        console.log("breakdowns: " + breakdowns);
        return breakdowns;
    }
}
