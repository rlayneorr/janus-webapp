import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { QuestionComponent } from './question.component';
import { Dependencies } from '../../../caliber.test.module';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Question } from '../../../entities/Question';
import { AlertsService } from '../../../services/alerts.service';


/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   *
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

fdescribe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // test if the components is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test if the question is set to null after a save
  it('should set question to null', () => {
    component.setQuestionNull();
    expect(component.question).toEqual(new Question());
    expect(component.sampleAnswers.length).toBe(0);
    expect(component.currentTags.length).toBe(0);
  });

  // test if it saves successfully
  it('should save successfully',
  inject([AlertsService], (service: AlertsService) => {
    service.success('Saved successfully');
    let msg = '';
    let ty = '';
    service.getMessage().subscribe((s) => {
      ty = s.type;
      msg = s.text;
      component.savedSuccessfully();
      expect(ty).toEqual('success');
      expect(msg).toEqual('Saved successfully');
    });
  }));
});
