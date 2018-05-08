import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubtopicComponent } from './add-subtopic.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { AddSubtopicService } from '../../../services/add-subtopic.service';
import { CalendarStatusService } from '../../../services/calendar-status.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../../services/calendar.service';
import { SessionService } from '../../../services/session.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { Subtopic } from '../../../models/subtopic.model';
import { Topic } from '../../../models/topic.model';
import { ScheduledSubtopic } from '../../../models/scheduledsubtopic.model';
import { Curriculum } from '../../../models/curriculum.model';
import { Schedule } from '../../../models/schedule.model';
import { Observable } from 'rxjs/Observable';

describe('AddSubtopicComponent', () => {
  let component: AddSubtopicComponent;
  let fixture: ComponentFixture<AddSubtopicComponent>;
  let subtopic: Subtopic;
  let testTopic: Topic;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440);

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubtopicComponent);
    component = fixture.componentInstance;
    const addSuptopicServie: AddSubtopicService = TestBed.get(AddSubtopicService);
    const statusService: CalendarStatusService = TestBed.get(CalendarStatusService);
    const modalService: NgbModal = TestBed.get(NgbModal);
    const calendarService: CalendarService = TestBed.get(CalendarService);
    const sessionService: SessionService = TestBed.get(SessionService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);

    testTopic = new Topic();
    testTopic.topicID = 1;
    testTopic.topicName = 'testTopic';
    subtopic = new Subtopic(1, 'testName', null, null, '', testTopic);
    const subArr: Subtopic[] = [];
    subArr.push(subtopic);
    subtopic.parentTopic = testTopic;

    // spyOn(addSuptopicServie, 'getSubtopicPool').and.returnValue(null);
    // spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(null);
    spyOn(sessionStorage, 'getItem').and.returnValue('{}');
    const a: number[] = [1];
    spyOn(addSuptopicServie, 'getSubtopicPool').and.returnValues(Observable.of(a), Observable.throw('error'));
    spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(Observable.of(subArr));

    TestBed.overrideProvider(AddSubtopicService, {useValue: addSuptopicServie});
    TestBed.overrideProvider(SubtopicService, {useValue: subtopicService});
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    // sessionStorage.setItem('batch', null);
    component.ngOnInit();
    component.ngOnInit();
  });

  it('should call onErrorLoadMessage', () => {
    component.onErrorLoadErrorMessage();
  });
  it('should call onChangeLoadSubtopics', () => {
    component.topicMap.set('test', 'test');
    component.selectedTopic = 'test';
    component.subtopicNameList.push('test');
    component.onChangeLoadSubtopics();
  });
  it('should call getTopics', () => {
    // setting the array for subtop in first else
    testTopic.topicName = 'testTopic';
    component.topicMap.set('test', 'test');
    component.selectedTopic = 'test';
    component.subtopicNameList.push('test');
    subtopic.parentTopic.topicName = 'test';
    component.uniqueTopics.add('t');
    const arr: Subtopic[] = [];
    arr.push(subtopic);
    component.getTopics(arr);

    // branching to else
    component.subtopicNameList.push('test');
    subtopic.parentTopic.topicName = 'test';
    component.uniqueTopics.add('test');
    const arr2: Subtopic[] = [];
    arr2.push(subtopic);
    component.getTopics(arr2);

  });
  it('should call onChangeGetSubtopicInfo', () => {
    // setting the array for subtop in first else
    testTopic.topicName = 'testTopic';
    component.topicMap.set('test', 'test');
    component.selectedTopic = 'test';
    component.subtopicNameList.push('test');
    subtopic.parentTopic.topicName = 'test';
    component.uniqueTopics.add('t');
    const arr: Subtopic[] = [];
    arr.push(subtopic);
    component.onChangeGetSubtopicInfo();
  });
  it('should call saveSubtopic for if', () => {
    component.selectedTopic = 'Select a Topic';
    component.saveSubtopic();
  });
  it('should call saveSubtopic for else', () => {
    component.selectedTopic = 'hello';
    component.selectedDate = new Date('2017-12-17T03:24:00');
    component.saveSubtopic();
  });
  it('should call saveSubtopic for else and then the if inside', () => {
    component.selectedTopic = 'hello';
    component.selectedDate = new Date('2020-12-17T03:24:00');
    component.saveSubtopic();
  });
  it('should call saveSubtopic for else if', () => {
    component.selectedTopic = 'hello';
    component.selectedDate = 'a';
    component.saveSubtopic();
  });
  it('should call saveSubtopic for else if', () => {
    component.selectedTopic = 'hello';
    component.selectedDate = 'a';
    spyOn(component, 'setSubtopicObject').and.returnValue(null);
    component.saveSubtopic();
  });
  it('should call checkSubtopics', () => {
    component.checkSubtopics();
  });
  it('should call changeAlertMessage', () => {
    component.changeAlertMessage('message');
  });
  it('should call changeSuccessMessage', () => {
    component.changeSuccessMessage('message');
  });

  it('should call setSuptopicObject', () => {
    component.setSubtopicObject();
  });
  it('should call addSelectedSubtopic', () => {
    component.addSelectedSubtopic();
  });
  it('should call updateSelectedSubtopic', () => {
    // let ssub: ScheduledSubtopic[] = [];
    // const s = new ScheduledSubtopic(1, 1, null);
    // const c: Curriculum = new Curriculum();
    // ssub.push(s);
    // const j = "{ 'id' : 1 , 'subtopics ': null, 'curriculum' :null}";
    // sessionStorage.setItem('schedule', j);
    // // console.log(sessionStorage.getItem('schedule'));
    // const a: Schedule = JSON.parse(sessionStorage.getItem('schedule'));
    // console.log(a);
    component.updateSelectedSubtopic();
  });
  it('should call open', () => {
    component.open('t');
  });
  it('should call selectSubtopic', () => {
    component.selectedSubtopic = 'test';
    component.selectSubtopic('t');
  });
  it('should call selectSubtopic', () => {
    component.selectedSubtopic = 'Select a Subtopic';
    component.selectSubtopic('t');
  });
});
