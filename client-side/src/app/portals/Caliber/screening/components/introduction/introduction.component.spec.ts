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

import { IntroductionComponent } from './introduction.component';

xdescribe('IntroductionComponent', () => {
  let component: IntroductionComponent;
  let fixture: ComponentFixture<IntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
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
});
