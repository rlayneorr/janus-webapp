// Testing modules
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dependencies } from '../../../caliber.test.module';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { COMMON_DEPRECATED_DIRECTIVES } from '@angular/common/src/directives';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

// Entities
import { Bucket } from '../entities/Bucket';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import { BucketFilterPipe } from './skillType-buckets.filter';
import { SkillTypeBucketsComponent } from './skillType-buckets.component';
import { Question } from '../../../entities/Question';

// Services
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
import { BucketsService } from '../services/buckets.service';

// Mock Data
import { BUCKETS } from '../mock-data/mock-buckets';
import { QuestionService } from '../../../screening/services/question/question.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

//Observables
import { defer } from 'rxjs/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}


fdescribe('SkillTypeBucketsComponent', () => {
  let httpClientSpyOnPost: { post: jasmine.Spy };
  let httpClientSpyOnPut: {put: jasmine.Spy };
  let bucketService: BucketsService;
  let component: SkillTypeBucketsComponent;
  let fixture: ComponentFixture<SkillTypeBucketsComponent>;
  const urlService: UrlService = new UrlService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    require('jasmine-ajax')

    //jasmine.Ajax.install();
  });

  afterEach(function (){
    //jasmine.Ajax.uninstall();
  })

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if the bucket gets edited or not.
   *
   * Function Tested: editBucket()
   **/
  fit('should edit a bucket', () => {
    component.editBucket(BUCKETS[0]);
    expect(component.currBucket).toEqual(BUCKETS[0]);
  });

  /**
   * Test if 2 buckets get sorted by isActive being true or false.
   * 
   * Function Tested: compare(a: Bucket, b:Bucket)
   */
  fit('should sort 2 buckets', ()=>{
    let tempBucket = BUCKETS[0];
    tempBucket.isActive = false;
    expect(component.compare(tempBucket, BUCKETS[1])).toEqual(1);
  });

  /**
   * Test if a bucket gets updated.
   * 
   * Function Tested: update(bucketParam: bucket)
   * Presently update appears to be untestable.
   */
  /*fit('update() should make Http put request', () => {
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    bucketService = new BucketsService(<any> httpClientSpyOnPut, urlService);
    const expected: Bucket = BUCKETS[4];
    httpClientSpyOnPut.put.and.returnValue(asyncData(expected));
    //component.updateBucket(expected);
    bucketService.updateBucket(BUCKETS[4]).subscribe(
      bucket => expect(bucket).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
  });*/
});
