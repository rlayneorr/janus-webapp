import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { QuestionComponent } from './question.component';
import { Dependencies } from '../../../caliber.test.module';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Question } from '../../../entities/Question';

<<<<<<< HEAD
=======
import { Tag } from '../entities/Tag';
import { QUESTIONS } from '../../../screening/mock-data/mock-questions';
import { AlertService } from '../../../../../gambit-client/services/alerts/alerts.service';
import { AlertsService } from '../../../services/alerts.service';

import { Observable } from 'rxjs/Observable';

>>>>>>> 0063343473a6e86f9cfe6a397cd8a1bb5a546fd6
/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
<<<<<<< HEAD
   * 
=======
   *
>>>>>>> 0063343473a6e86f9cfe6a397cd8a1bb5a546fd6
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

fdescribe('QuestionComponent', () => {
<<<<<<< HEAD
  let component: QuestionComponent; 
  let fixture: ComponentFixture<QuestionComponent>;  
=======
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  const t0: Tag = new Tag();
  t0.tagId = 1;
  t0.tagName = 'Java';
  const t1: Tag = new Tag();
  t1.tagId = 2;
  t1.tagName = 'HTML';
>>>>>>> 0063343473a6e86f9cfe6a397cd8a1bb5a546fd6

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set question to null', () => {
    component.setQuestionNull();
    expect(component.question).toEqual(new Question());
    expect(component.sampleAnswers.length).toBe(0);
    expect(component.currentTags.length).toBe(0);
  });
<<<<<<< HEAD
=======

  it('should add new tags', () => {
    component.addNewTag(t0);
    let lastTagIndex = component.currentTags.length - 1;
    expect(component.currentTags[lastTagIndex]).toEqual(t0);


    component.addNewTag(t1);
    lastTagIndex = component.currentTags.length - 1;

    expect(component.currentTags[lastTagIndex]).toEqual(t1);
    expect(component.currentTags[lastTagIndex - 1]).toEqual(t0);
  });

  it('should return all tags in the tag array', () => {
      expect(component.getTagIds().length).toBe(0);
      component.addNewTag(t0);
      expect(component.getTagIds().length).toBe(1);
  });

  xit('should change question status', () => {
    component.changeQuesitonStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(false);
    component.changeQuesitonStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(true);
  });
>>>>>>> 0063343473a6e86f9cfe6a397cd8a1bb5a546fd6
});
