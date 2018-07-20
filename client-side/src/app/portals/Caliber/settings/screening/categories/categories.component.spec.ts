// Testing modules
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dependencies } from '../../../caliber.test.module';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { COMMON_DEPRECATED_DIRECTIVES } from '@angular/common/src/directives';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

// Entities
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import { BucketFilterPipe } from './skillType-buckets.filter';

// Services
import { AlertsService } from '../../../services/alerts.service';

// Mock Data
import { BUCKETS } from '../mock-data/mock-buckets';
import { QuestionService } from '../../../screening/services/question/question.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

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
   */
  fit('should update a bucket', ()=>{
    expect(true).toBe(false);
  })
});
