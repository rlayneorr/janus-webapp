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
import { Batch } from '../../../models/batch.model';
import { ScheduledDate } from '../../../models/scheduleddate.model';
import { BamUser } from '../../../models/bamuser.model';
import { User } from '../../../../../hydra-client/entities/User';
/*
  test for addSubtopicComponent

*/
describe('AddSubtopicComponent', () => {
  let component: AddSubtopicComponent;
  let fixture: ComponentFixture<AddSubtopicComponent>;
  let subtopic: Subtopic;
  let testTopic: Topic;
  let spy: any;
  let mySubArr;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubtopicComponent);
    component = fixture.componentInstance;

    // getting testbed services
    const addSuptopicServie: AddSubtopicService = TestBed.get(AddSubtopicService);
    const statusService: CalendarStatusService = TestBed.get(CalendarStatusService);
    const modalService: NgbModal = TestBed.get(NgbModal);
    const calendarService: CalendarService = TestBed.get(CalendarService);
    const sessionService: SessionService = TestBed.get(SessionService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);

    testTopic = new Topic();
    testTopic.topicID = 1;
    testTopic.topicName = 'testName';
    subtopic = new Subtopic(1, 'testName', new Date(), new Date(), '', testTopic);
    const anotherSubtopic = new Subtopic(2, 'name', new Date(), new Date(), 'status', new Topic() );
    const asubtopic = new Subtopic(1, 'testName', new Date(), new Date(), '', testTopic);
    const subArr: Subtopic[] = [];
    subArr.push(asubtopic);
    subArr.push(anotherSubtopic);
    mySubArr = subArr;
    subtopic.parentTopic = testTopic;
    const testschDate = new ScheduledDate(1, 1, 1, 1, 1);
    const testsub = new ScheduledSubtopic(1, 1, testschDate);
    const tsub: ScheduledSubtopic[] = [];
    const tCurr = new Curriculum();
    tsub.push(testsub);
    let bUser: BamUser;
    let bUser2: BamUser;
    let tBatch: Batch;
    bUser2 = new BamUser(1, 'firstname', 'k', 'lastname', 'email', 'pwd', 1, tBatch, '', '', '', '', 1);
    tBatch = new Batch(1, 'testName', new Date(), new Date(), bUser2, 1, 1);
    bUser = new BamUser(1, 'firstname', 'k', 'lastname', 'email', 'pwd', 1, tBatch, '', '', '', '', 1);
    const testBatch = new Batch(1, '', new Date(), new Date(), bUser, 2, 2);
    const testSched = new Schedule(1, tsub , tCurr);

    // Making json for JSON parse
    const jSched = JSON.stringify(testSched);
    const t = JSON.stringify(testBatch);
    const p = JSON.stringify(subArr);

    // returning JSON when sessionStorage is called
    spyOn(sessionStorage, 'getItem').and.callFake((batch) => {
      if (batch === 'batch') {
       return t;
      }
      if (batch === 'schedule') {
        return jSched;
      }
      if (batch === 'subtopics') {
        return p;
      }
    });
    const a: number[] = [1, 2];

    // spying on service to return mock values
    spyOn(addSuptopicServie, 'getSubtopicPool').and.returnValues(Observable.of(a), Observable.throw('error'));
    spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(Observable.of(subArr));
    spyOn(addSuptopicServie, 'updateSchedule').and.returnValue(Observable.of(true));
    spyOn(modalService, 'open').and.returnValue('ok');


    TestBed.overrideProvider(AddSubtopicService, {useValue: addSuptopicServie});
    TestBed.overrideProvider(SubtopicService, {useValue: subtopicService});
    component.selectedTopic = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    // component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should call onErrorLoadMessage', () => {
    spy = spyOn(component, 'onErrorLoadErrorMessage').and.callThrough();
    component.onErrorLoadErrorMessage();
    expect(spy).toHaveBeenCalled();
  });
  it('should call onChangeLoadSubtopics', () => {
    spy = spyOn(component , 'onChangeLoadSubtopics').and.callThrough();
    component.topicMap.set('test', 'test');
    component.selectedTopic = 'test';
    component.subtopicNameList.push('test');
    component.onChangeLoadSubtopics();
    expect(spy).toHaveBeenCalled();
  });
  it('should call getTopics', () => {
    spy = spyOn(component , 'getTopics').and.callThrough();
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
    expect(spy).toHaveBeenCalled();
  });
  it('should call onChangeGetSubtopicInfo', () => {
    spy = spyOn(component , 'onChangeGetSubtopicInfo').and.callThrough();
    component.selectedSubtopic = 'testName';
    component.onChangeGetSubtopicInfo();
    expect(spy).toHaveBeenCalled();
  });
  it('should call saveSubtopic for if', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'Select a Topic';
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  xit('should call saveSubtopic for else', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = new Date('2017-12-17T03:24:00');
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  xit('should call saveSubtopic for else and then the if inside', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = new Date('2020-12-17T03:24:00');
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  it('should call saveSubtopic for else if', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = 'a';
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  it('should call saveSubtopic for else if', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = 'a';
    spyOn(component, 'setSubtopicObject').and.returnValue(true);
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  xit('should call saveSubtopic for else', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = new Date('2017-12-17T03:24:00');
    spyOn(component, 'checkSubtopics').and.returnValue(true);
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  xit('should call saveSubtopic for else', () => {
    spy = spyOn(component , 'saveSubtopic').and.callThrough();
    component.selectedTopic = 'hello';
    component.selectedSubtopic = 'hello';
    component.selectedDate = new Date('2017-12-17T03:24:00');
    spyOn(component, 'checkSubtopics').and.returnValue(false);
    component.saveSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  it('should call checkSubtopics', () => {
    component.prevDate = new Date();
    component.newDate = new Date();
    spy = spyOn(component , 'checkSubtopics').and.callThrough();
    // console.log('batchSuptopics', mySubArr);
    // console.log('batchSubtopic [i]', mySubArr[0].subtopicName);
    component.selectedSubtopic = 'testName';
    component.setSubtopicObject();
    component.checkSubtopics();
    expect(spy).toHaveBeenCalled();
  });
  it('should call changeAlertMessage', () => {
    spy = spyOn(component , 'changeAlertMessage').and.callThrough();
    component.changeAlertMessage('message');
    expect(spy).toHaveBeenCalled();
  });
  it('should call changeSuccessMessage', () => {
    spy = spyOn(component , 'changeSuccessMessage').and.callThrough();
    component.changeSuccessMessage('message');
    expect(spy).toHaveBeenCalled();
  });

  it('should call setSuptopicObject', () => {
    spy = spyOn(component , 'setSubtopicObject').and.callThrough();
    component.selectedSubtopic = 'testName';
    component.setSubtopicObject();
    expect(spy).toHaveBeenCalled();
  });
  it('should call addSelectedSubtopic', () => {
    spy = spyOn(component , 'addSelectedSubtopic').and.callThrough();
    component.selectedSubtopic = 'testName';
    component.setSubtopicObject();
    component.addSelectedSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  it('should call updateSelectedSubtopic', () => {
    spy = spyOn(component , 'updateSelectedSubtopic').and.callThrough();
    component.currentBatch.startDate = new Date();
    component.selectedSubtopic = 'testName';
    component.setSubtopicObject();
    component.updateSelectedSubtopic();
    expect(spy).toHaveBeenCalled();
  });
  xit('should call open', () => {
    spy = spyOn(component , 'open').and.callThrough();
    component.open(null);
    expect(spy).toHaveBeenCalled();
  });
  xit('should call selectSubtopic', () => {
    spy = spyOn(component , 'selectSubtopic').and.callThrough();
    component.selectedSubtopic = 'test';
    component.selectSubtopic('t');
    expect(spy).toHaveBeenCalled();
  });
  xit('should call selectSubtopic', () => {
    spy = spyOn(component , 'selectSubtopic').and.callThrough();
    component.selectedSubtopic = 'Select a Subtopic';
    component.selectSubtopic('t');
    expect(spy).toHaveBeenCalled();
  });
  xit('should call setDraggableOnSubtopic', () => {
    spy = spyOn(component , 'setDraggableOnSubtopic').and.callThrough();
    component.selectedSubtopic = 'test';
    component.setDraggableOnSubtopic(event, 'testName');
    expect(spy).toHaveBeenCalled();
  });
});
