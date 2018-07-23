// Testing modules
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

// Modules
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dependencies } from '../../../caliber.test.module';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { COMMON_DEPRECATED_DIRECTIVES } from '@angular/common/src/directives';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

// Components
import { QuestionComponent } from './question.component';

// Entities
import { Question } from '../../../entities/Question';

// Services
import { AlertsService } from '../../../services/alerts.service';

// Mock Data
import { QUESTIONS } from '../../../screening/mock-data/mock-questions';

/**
 * Test for methods on the question component.
 *
 * @author Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Byron Hall | 1803-USF-MAR26 | Wezley Singleton
 **/

/**
 * Setting up the testing environment for question component.
 **/
describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  /**
   * Import dependencies and set the TestBed to configure the testing module.
   **/
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }), 1440000);

  /**
   * Set up a fixture to use instead of using testbed. This allows us to use
   * the question component as an instace of the question component for testing.
   **/
  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test if the components is created.
   *
   * Function tested: None, just check if the component gets created.
   **/
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
  * Test if it opens an modal given a modal id.
  *
  * Function tested: open()
  **/
  it('should open modal-content', () => {
    const content = document.querySelector('.modal-content');
    component.open(content);
    document.querySelector('.modal-content');
    expect(content).toBeDefined('defined');
  });

  /**
   *  Used to validate the create/update question form.
   *
   * Function tested: initFormControl()
   */
  it('should create a form group element name', () => {
    component.initFormControl();
    component.createQuestion.controls['name'].setValue('test');
    expect(component.createQuestion.valid).toBeTruthy();
  });

  /**
  * Test if the question status changes from active to deactive.
  *
  * Function tested: changeQuestionStatus()
  **/
  it('should change question status', () => {
    component.changeQuestionStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(false);
    component.changeQuestionStatus(QUESTIONS[0]);
    expect(QUESTIONS[0].isActive).toBe(true);
  });

  /**
   * Test if the question is set to null after a save.
   *
   * Function tested: setQuestionNull()
   **/
  it('should set question to null', () => {
    component.setQuestionNull();
    expect(component.question).toEqual(new Question());
    expect(component.sampleAnswers.length).toBe(0);
  });

  /**
   * Test if the question gets edited or not.
   *
   * Function Tested: editQuestion()
   **/
  // it('should edit a question', () => {
  //   component.editQuestion(QUESTIONS[0]);
  //   expect(component.question).toEqual(QUESTIONS[0]);
  //   inject([TagsService], (ts: TagsService) => {
  //     ts.getAllTags().subscribe((s) => {
  //       // console.log('output to tags service.');
  //       // console.log(s);
  //     });
  //   });
  // });

  /**
   * populate the current question and the current tags with the selected question.
   *
   * Function tested: updateQuestions()
   **/
  it('shoud update questions from the bucket', () => {
    this.currentBucket = true;
    component.questions = Question['test'];
    component.updateQuestions();
    expect(component.questions).toBe(Question['test']);
  });

  /**
   * Test if it displays Saved successfully.
   *
   * Function tested: savedSuccessfully();
   **/
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

  /**
   * Test if it display update successfully successfully.
   *
   * Function tested: updatedSuccessfully()
   **/
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

  /**
   * Test if an error message is sent to the alert service to display.
   *
   * Function tested: savedUnsuccessfull()
   **/
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


});

