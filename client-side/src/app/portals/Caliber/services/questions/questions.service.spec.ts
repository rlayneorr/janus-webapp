import { TestBed, inject } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { Question } from '../../entities/Question';
import { HttpClient, HttpHandler, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { QUESTIONS, replacementQuestion, expectedQuestion } from './mock-questions';
import { HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { UrlUtilService } from '../../screening/services/UrlUtil/url-util.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   * 
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * This describe block is actually using mock data. It uses the same approach as this example:
 * https://angular.io/guide/testing#testing-http-services
 */

fdescribe('QuestionsService ', () => {
  const testBucket = -1;
  let httpClientSpyOnGet: { get: jasmine.Spy };
  let httpClientSpyOnPost: { post: jasmine.Spy };
  let httpClientSpyOnPut: {put: jasmine.Spy };
  let questionsService: QuestionsService;

  //////////////////////////////////////////////////////////////////////////////////////////////////

  // see if getBucketQuestions makes an http request
  it('getBucketQuestions should return expected questions from bucket #' + testBucket + ' (HttpClient called once)', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    questionsService = new QuestionsService(<any> httpClientSpyOnGet, new UrlUtilService);

    const expectedQuestions: Question[] = [expectedQuestion];

    httpClientSpyOnGet.get.and.returnValue(asyncData(expectedQuestions));

    questionsService.getBucketQuestions(testBucket).subscribe(
      questions => expect(questions).toEqual(expectedQuestions, 'expected questions'),
      fail
    );
    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

    // see if createNewQuestion makes an http request
  it('createNewQuestion should call HttpClient.post, and return the new question', () => {
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    questionsService = new QuestionsService(<any> httpClientSpyOnPost, new UrlUtilService);

    httpClientSpyOnPost.post.and.returnValue(asyncData(QUESTIONS[0]));

    questionsService.createNewQuestion(QUESTIONS[0], [1]).subscribe(
      questions => expect(questions).toEqual(QUESTIONS[0]),
      fail
    );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
  });

  // see if updateQuestion makes an http request
  it('updateQuestion should call HttpClient.post, and return the altered question', () => {
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    questionsService = new QuestionsService(<any> httpClientSpyOnPost, new UrlUtilService);

    httpClientSpyOnPost.post.and.returnValue(asyncData(QUESTIONS[0]));

    questionsService.updateQuestion(QUESTIONS[0], [1]).subscribe(
      questions => expect(questions).toEqual(QUESTIONS[0]),
      fail
    );

    expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
  });

    // see if updateQuestion makes an http request
  it('activateQuestion should call HttpClient.put, and return the activated question', () => {
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    questionsService = new QuestionsService(<any> httpClientSpyOnPut, new UrlUtilService);

    httpClientSpyOnPut.put.and.returnValue(asyncData(QUESTIONS[0]));

    questionsService.activateQuestion(1).subscribe(
      questions => expect(questions).toEqual(QUESTIONS[0]),
      fail
    );

    expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
  });

  it('dectivateQuestion should call HttpClient.put, and return the activated question', () => {
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    questionsService = new QuestionsService(<any> httpClientSpyOnPut, new UrlUtilService);

    httpClientSpyOnPut.put.and.returnValue(asyncData(QUESTIONS[0]));

    questionsService.deactivateQuestion(1).subscribe(
      questions => expect(questions).toEqual(QUESTIONS[0]),
      fail
    );

    expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // test error responses
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  it('getBucketQuestions should return an error when the server returns a 404', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    questionsService = new QuestionsService(<any> httpClientSpyOnGet, new UrlUtilService);

    httpClientSpyOnGet.get.and.returnValue(asyncError(errorResponse));

    questionsService.getBucketQuestions(testBucket).subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.message).toContain('404')
    );
  });
  it('createNewQuestion should return an error when the server returns a 404', () => {
    httpClientSpyOnPost.post.and.returnValue(asyncError(errorResponse));
    questionsService = new QuestionsService(<any> httpClientSpyOnPost, new UrlUtilService);

    questionsService.createNewQuestion(QUESTIONS[0], [1]).subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.message).toContain('404')
    );
  });
  it('updateQuestion should return an error when the server returns a 404', () => {
    httpClientSpyOnPost.post.and.returnValue(asyncError(errorResponse));
    questionsService = new QuestionsService(<any> httpClientSpyOnPost, new UrlUtilService);

    questionsService.updateQuestion(QUESTIONS[0], [1]).subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.message).toContain('404')
    );
  });
  it('activateQuestion should return an error when the server returns a 404', () => {
    httpClientSpyOnPut.put.and.returnValue(asyncError(errorResponse));
    questionsService = new QuestionsService(<any> httpClientSpyOnPut, new UrlUtilService);

    questionsService.activateQuestion(1).subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.message).toContain('404')
    );
  });
  it('deactivateQuestion should return an error when the server returns a 404', () => {
    httpClientSpyOnPut.put.and.returnValue(asyncError(errorResponse));
    questionsService = new QuestionsService(<any> httpClientSpyOnPut, new UrlUtilService);

    questionsService.deactivateQuestion(1).subscribe(
      questions => fail('expected an error, not questions'),
      error  => expect(error.message).toContain('404')
    );
  });
});
