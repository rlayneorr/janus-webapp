import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
// import { AlertsService } from '../services/alerts.service';
import { CategoryService } from '../../services/category/category.service';

describe('CategoryService', () => {
  // let httpClientSpyOnGet: { get: jasmine.Spy };
  // let httpClientSpyOnPost: { post: jasmine.Spy };
  // let httpClientSpyOnPut: {put: jasmine.Spy };
  // let categoryService: CategoryService;

  // it('getBucketQuestions should return expected questions from bucket #' + testBucket + ' (HttpClient called once)', () => {
  //   httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
  //   categoryService = new categoryService(<any> httpClientSpyOnGet);

  //   const expectedQuestions: Category[] = [expectedQuestion];

  //   httpClientSpyOnGet.get.and.returnValue(asyncData(expectedQuestions));

  //   questionsService.getBucketQuestions(testBucket).subscribe(
  //     questions => expect(questions).toEqual(expectedQuestions, 'expected questions'),
  //     fail
  //   );
  //   expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  // });
});
