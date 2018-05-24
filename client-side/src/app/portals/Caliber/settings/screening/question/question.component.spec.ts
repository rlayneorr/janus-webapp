import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { QuestionComponent } from './question.component';
import { Dependencies } from '../../../caliber.test.module';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Question } from '../../../entities/Question';
import { AlertsService } from '../../../services/alerts.service';

import { Tag } from '../entities/Tag';
import { QUESTIONS } from '../../../screening/mock-data/mock-questions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TagsService } from '../services/tags.service';

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
  const t0: Tag = new Tag();
  t0.tagId = 1;
  t0.tagName = 'Java';
  const t1: Tag = new Tag();
  t1.tagId = 2;
  t1.tagName = 'HTML';

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test if the components is created.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test if it opens an modal given a modal id
  it('should open modal-content', () => {
    const content = document.querySelector('.modal-content');
    component.open(content);
    document.querySelector('.modal-content');
    expect(content).toBeDefined('defined');

  });
  // Test if the question status changes from active to deactive.
  it('should change question status', () => {
    component.changeQuesitonStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(false);
    component.changeQuesitonStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(true);
  });

  // Test if the question is set to null after a save.
  it('should set question to null', () => {
    component.setQuestionNull();
    expect(component.question).toEqual(new Question());
    expect(component.sampleAnswers.length).toBe(0);
    expect(component.currentTags.length).toBe(0);
  });

  // Test if the question gets edited or not.
  it('should edit a question', () => {
    component.editQuestion(QUESTIONS[0]);
    expect(component.question).toEqual(QUESTIONS[0]);
    inject([TagsService], (ts: TagsService) => {
      ts.getAllTags().subscribe((s) => {
        // console.log('output to tags service.');
        // console.log(s);
      });
    });
  });

  // Test to check if it adds new tags to the questions
  it('should add new tags', () => {
    component.addNewTag(t0);
    let lastTagIndex = component.currentTags.length - 1;
    expect(component.currentTags[lastTagIndex]).toEqual(t0);
    component.addNewTag(t1);
    lastTagIndex = component.currentTags.length - 1;
    expect(component.currentTags[lastTagIndex]).toEqual(t1);
    expect(component.currentTags[lastTagIndex - 1]).toEqual(t0);
  });

  // Test if gets all the tags in the tag array.
  it('should return all tags in the tag array', () => {
    expect(component.getTagIds().length).toBe(0);
    component.addNewTag(t0);
    expect(component.getTagIds().length).toBe(1);
  });

  // Test if it displays Saved successfully.
  it('should save successfully',
  inject([AlertsService], (service: AlertsService) => {
    component.savedSuccessfully();
    let msg = '';
    let ty = '';
    service.getMessage().subscribe((s) => {
      ty = s.type;
      msg = s.text;
      expect(ty).toEqual('success');
      expect(msg).toEqual('Saved successfully');
    });
  }));

  // Test if it display update successfully successfully.
  it('should update successfully',
  inject([AlertsService], (srv: AlertsService) => {
    component.updatedSuccessfully();
    let msgUpdate = '';
    let tyUpdate = '';
    srv.getMessage().subscribe((s) => {
      tyUpdate = s.type;
      msgUpdate = s.text;
      expect(tyUpdate).toEqual('success');
      expect(msgUpdate).toEqual('Updated successfully');
    });
  }));

  // Test if an error message is sent to the alert service to display.
  it('should display save unsuccessfull error message',
  inject([AlertsService], (srv: AlertsService) => {
    component.savedUnsuccessfull();
    let msgUpdate = '';
    let tyUpdate = '';
    srv.getMessage().subscribe((s) => {
      tyUpdate = s.type;
      msgUpdate = s.text;
      expect(tyUpdate).toEqual('error');
      expect(msgUpdate).toEqual('All Fields Must be Filled');
    });
  }));

  // removeTagFromQuestion(Tag)
  it('should add the selected tag to the all tags array and remove it from the current tags array', () => {
    component.allTags = [];

    component.currentTags = [];
    component.currentTags[0] = t0;
    component.currentTags[1] = t1;

    expect(component.allTags.length).toBe(0);
    expect(component.currentTags.length).toBe(2);

    component.removeTagFromQuestion(t0);

    expect(component.allTags).toContain(t0);
    expect(component.currentTags).toContain(t1);
    expect(component.currentTags.length).toBe(1);
  });

  // addTagToQuestion(Tag)
  it('should add the selected tag to the current tags array and remove it from the all tags array', () => {
    component.allTags = [];
    component.allTags[0] = t0;
    component.allTags[1] = t1;

    component.currentTags = [];

    expect(component.currentTags.length).toBe(0);
    expect(component.allTags.length).toBe(2);

    component.addTagToQuestion(t0);

    expect(component.currentTags).toContain(t0);
    expect(component.allTags).toContain(t1);
    expect(component.allTags.length).toBe(1);

  });
});
