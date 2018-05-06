import { TestBed, inject } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { Question } from '../entities/Question';

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

describe('QuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsService]
    });
  });

  it('should be created', inject([QuestionsService], (service: QuestionsService) => {
    expect(service).toBeTruthy();
  }));

  it('createNewQuestion should put a new question on the database', inject([QuestionsService], (service: QuestionsService) => {
    service.createNewQuestion(-1, QUESTIONS[0], [1, 1, 1]);
    service.createNewQuestion(-1, QUESTIONS[1], [1, 1, 1]);
    service.createNewQuestion(-1, QUESTIONS[2], [1, 1, 1]);
    expect(service.getBucketQuestions(0));
  }));

  it('updateQuestion should update our question on the database', inject([QuestionsService], (service: QuestionsService) => {

  }));

  it('activateQuestion should activate our question', inject([QuestionsService], (service: QuestionsService) => {
  }));

  it('getBucketQuestions should return our questions', inject([QuestionsService], (service: QuestionsService) => {
  }));

  it('deactivateQuestion should remove our question', inject([QuestionsService], (service: QuestionsService) => {
  }));
});
