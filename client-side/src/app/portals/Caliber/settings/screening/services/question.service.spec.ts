import { TestBed, inject } from '@angular/core/testing';

import {AlertsService} from "../../../services/alerts.service";
import {asyncData} from "../../../services/category/category.service.spec";
import {Question} from "../../../screening/entities/question";
import {QUESTIONS} from "../../../screening/mock-data/mock-questions";
import {QuestionComponent} from "../question/question.component";
import {QuestionService} from "../../../screening/services/question/question.service";
import {SettingsQuestionService} from "./question.service";

describe('QuestionService', () => {

  // let httpClientSpyOnGet: { get: jasmine.Spy };
  // let httpClientSpyOnPost: { post: jasmine.Spy };
  // let httpClientSpyOnPut: {put: jasmine.Spy };
  // let httpClientSpyOnDelete: { delete: jasmine.Spy };
  let questionService: SettingsQuestionService;
  const alertsService: AlertsService = new AlertsService();

  it('')



  // it('createNewQuestion() should make Http post request, and return the question that it created', () => {
  //   httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
  //   settingQuestionService = new SettingsQuestionService(httpClientSpyOnPost);
  //
  //   const expected : Question = QUESTIONS[1];
  //
  //   httpClientSpyOnPost.post.and.returnValue(asyncData(expected));
  //
  //   questionService.createNewQuestion(QUESTIONS[1]).subscribe(
  //     questions => expect(questions[1]).toEqual(expected, 'expected question'),
  //     fail
  //   );
  //
  //   expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
  // });







});
