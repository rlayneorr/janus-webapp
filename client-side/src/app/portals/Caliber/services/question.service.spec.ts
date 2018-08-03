import {AlertsService} from "./alerts.service";
import {asyncData} from "./category/category.service.spec";
import {Question} from "../screening/entities/question";
import {QUESTIONS} from "../screening/mock-data/mock-questions";
import {QuestionService} from "./question/question.service";


describe('QuestionService', () => {

  let httpClientSpyOnGet: { get: jasmine.Spy };
  let httpClientSpyOnPost: { post: jasmine.Spy };
  let httpClientSpyOnPut: { put: jasmine.Spy };
  let httpClientSpyOnDelete: { delete: jasmine.Spy };
  let questionService: QuestionService;
  const alertsService: AlertsService = new AlertsService();

  it('createNewQuestion() should make Http post request, and return the question that it created', () => {
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    //questionService = new QuestionService(<any> httpClientSpyOnPost);

    const expected: Question = QUESTIONS[1];

    httpClientSpyOnPost.post.and.returnValue(asyncData(expected));

    // questionService.createNewQuestion(QUESTIONS[1]).subscribe(
    //   questions => expect(questions[1]).toEqual(expected[1], 'expected question'),
    //   fail
    // );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
  });

});
