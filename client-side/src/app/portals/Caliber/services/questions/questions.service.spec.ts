import { TestBed, inject } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { Question } from '../../entities/Question';
import { HttpClient, HttpHandler } from '@angular/common/http';
// import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';

fdescribe('QuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionsService,
        HttpClient,
        HttpHandler,
      ]
    });
  });

  it('should be created', inject([QuestionsService], (service: QuestionsService) => {
      expect(service).toBeTruthy();
  }));

  it('createNewQuestion should put new questions into the test bucket', inject([QuestionsService], (service: QuestionsService) => {
    const returnValue: Question = new Question();

    service.createNewQuestion(-1, QUESTIONS[0], [1, 1, 1]).subscribe(
      (data: Question) => QUESTIONS[0] = {
        bucketId: data['bucketId'],
        questionId: data['question']['questionId'],
        questionText: data['question']['questionText'],
        sampleAnswer1: data['question']['sampleAnswer1'],
        sampleAnswer2: data['question']['sampleAnswer2'],
        sampleAnswer3: data['question']['sampleAnswer3'],
        sampleAnswer4: data['question']['sampleAnswer4'],
        sampleAnswer5: data['question']['sampleAnswer5'],
      });
    expect(returnValue).toEqual(QUESTIONS[0]);

    service.createNewQuestion(-1, QUESTIONS[1], [1, 1, 1]).subscribe(
      (data: Question) => QUESTIONS[1] = {
        bucketId: data['bucketId'],
        questionId: data['question']['questionId'],
        questionText: data['question']['questionText'],
        sampleAnswer1: data['question']['sampleAnswer1'],
        sampleAnswer2: data['question']['sampleAnswer2'],
        sampleAnswer3: data['question']['sampleAnswer3'],
        sampleAnswer4: data['question']['sampleAnswer4'],
        sampleAnswer5: data['question']['sampleAnswer5'],
      });
    expect(returnValue).toEqual(QUESTIONS[1]);

    service.createNewQuestion(-1, QUESTIONS[2], [1, 1, 1]).subscribe(
      (data: Question) => QUESTIONS[2] = {
        bucketId: data['bucketId'],
        questionId: data['question']['questionId'],
        questionText: data['question']['questionText'],
        sampleAnswer1: data['question']['sampleAnswer1'],
        sampleAnswer2: data['question']['sampleAnswer2'],
        sampleAnswer3: data['question']['sampleAnswer3'],
        sampleAnswer4: data['question']['sampleAnswer4'],
        sampleAnswer5: data['question']['sampleAnswer5'],
      });
    expect(returnValue).toEqual(QUESTIONS[2]);
  }));

  it('getBucketQuestions should return any questions stored in bucket -1 (the testing bucket)',
  inject([QuestionsService], (service: QuestionsService) => {
    let questionsFromTestBucket: Question[];

    // see what's currently in bucket -1
    service.getBucketQuestions(-1).subscribe(data => {
      questionsFromTestBucket = (data as Question[]);
    });

    // If QUESTIONS[0] is already in the test bucket, great. If not, put it there.
    if (questionsFromTestBucket.includes(QUESTIONS[0]) === false) {
      service.createNewQuestion(-1, QUESTIONS[0], [-1, -1, -1]);
    }

    expect(questionsFromTestBucket).toContain(QUESTIONS[0]);
    expect(questionsFromTestBucket).toContain(QUESTIONS[1]);
    expect(questionsFromTestBucket).toContain(QUESTIONS[2]);
  }));

  it('updateQuestion should update our question on the database', inject([QuestionsService], (service: QuestionsService) => {
    let questionsFromTestBucket: any[];

    // see what's currently in bucket -1, so we can get the ids of the questions in there
    service.getBucketQuestions(-1).subscribe(data => {
      questionsFromTestBucket = (data as Question[]);
    });

    // use the ids we got from getBucketQuestions, to target a question for updating
    service.updateQuestion(questionsFromTestBucket[0].questionId,
      replacementQuestion, [-1, -1, -1]);

    // pull the questions again, to see if our update worked
    service.getBucketQuestions(-1).subscribe(data => {
      questionsFromTestBucket = (data as Question[]);
    });

    expect(questionsFromTestBucket).toContain(replacementQuestion);
  }));

  it('activateQuestion should activate our question', inject([QuestionsService], (service: QuestionsService) => {
  }));

  it('deactivateQuestion should remove our question', inject([QuestionsService], (service: QuestionsService) => {
  }));
});

const QUESTIONS: Question[] = [
  {
      questionId: 0,
      bucketId: 0,
      questionText: 'whuts yr favorite color',
      sampleAnswer1: 'answer1',
      sampleAnswer2: 'answer2',
      sampleAnswer3: 'answer3',
      sampleAnswer4: 'answer4',
      sampleAnswer5: 'answer5'
  },
  {
      questionId: 1,
      bucketId: 0,
      questionText: 'bleh',
      sampleAnswer1: 'bhahfha',
      sampleAnswer2: 'dsflkj',
      sampleAnswer3: 'eiei',
      sampleAnswer4: 'qq',
      sampleAnswer5: 'rew'
  },
  {
      questionId: 2,
      bucketId: 0,
      questionText: '000000',
      sampleAnswer1: 'asdf',
      sampleAnswer2: 'mnbb',
      sampleAnswer3: 'rewq',
      sampleAnswer4: 'hjkl',
      sampleAnswer5: 'poiu'
},
];

const replacementQuestion: Question = {
  questionId: 2,
  bucketId: 0,
  questionText: 'This is what the question should say after being replaced',
  sampleAnswer1: 'bubba',
  sampleAnswer2: 'buck',
  sampleAnswer3: 'scooter',
  sampleAnswer4: 'lou anne',
  sampleAnswer5: 'idk man'
};

