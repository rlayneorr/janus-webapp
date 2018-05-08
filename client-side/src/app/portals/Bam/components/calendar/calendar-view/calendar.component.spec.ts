
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { NO_ERRORS_SCHEMA, Injectable, DebugElement, ElementRef } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';
import { LocationStrategy } from '@angular/common';
import { AlertService } from '../../../services/alert.service';
import { CalendarService } from '../../../services/calendar.service';
import { CalendarStatusService } from '../../../services/calendar-status.service';
import { AddSubtopicService } from '../../../services/add-subtopic.service';
import { SubtopicService } from '../../../services/subtopic.service';
import { BamUser } from '../../../models/bamuser.model';
import { Subject } from 'rxjs/Subject';
import { Batch } from '../../../models/batch.model';
import { BatchType } from '../../../models/batchtype.model';
import { Observable } from 'rxjs/Observable';
import { Subtopic } from '../../../models/subtopic.model';
import { Topic } from '../../../models/topic.model';
import { UrlService } from '../../../../../hydra-client/services/urls/url.service';
import { Schedule } from '../../../models/schedule.model';
import { ScheduledSubtopic } from '../../../models/scheduledsubtopic.model';
import { Curriculum } from '../../../models/curriculum.model';
import { ScheduledDate } from '../../../models/scheduleddate.model';
import { CalendarEvent } from '../../../models/calendar-event.model';
import { Subscription } from 'rxjs/Subscription';
import { By } from '@angular/platform-browser';

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  // Spies that need to be referenced later
  let sessionStorageSetItemSpy: jasmine.Spy;
  let calendarServiceUpdateTopicSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }));

  beforeEach(() => {

    const calendarService: CalendarService = TestBed.get(CalendarService);
    const statusService: CalendarStatusService = TestBed.get(CalendarStatusService);
    const addSubtopicService: AddSubtopicService = TestBed.get(AddSubtopicService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    const sessionService: SessionService = TestBed.get(SessionService);

    // Create spies that need to be referenced later
    sessionStorageSetItemSpy = spyOn(sessionStorage, 'setItem');
    calendarServiceUpdateTopicSpy = spyOn(calendarService, 'updateTopicStatus').and.returnValue(
      Observable.of('Test string: updateTopicStatus'));

    // Create other spies
    spyOn(calendarService, 'getScheduleByScheduleId').and.returnValue(
      Observable.of(
        new Schedule(
          0,
          [
            new ScheduledSubtopic(0, 0, new ScheduledDate(0, 0, 1, 1, 1)),
            new ScheduledSubtopic(1, 1, new ScheduledDate(0, 0, 1, 1, 1)),
            new ScheduledSubtopic(2, 2, new ScheduledDate(0, 0, 1, 1, 1)),
            new ScheduledSubtopic(3, 3, new ScheduledDate(0, 0, 1, 1, 1)),
            new ScheduledSubtopic(4, 4, new ScheduledDate(0, 0, 1, 1, 1))
          ],
          new Curriculum()
      )));
      const retEvent = new CalendarEvent();
      retEvent.color = 'TestColor';
      retEvent.start = new Date(2018, 1);
      retEvent.status = 'TestStatus';
      retEvent.subtopicId = 0;
      retEvent.subtopicName = 'STopic1';
      retEvent.title = 'TestEvent';
    spyOn(calendarService, 'mapSubtopicToEvent').and.returnValue(retEvent);
    spyOn(calendarService.addCalendarEvent, 'subscribe').and.callFake((func: (value: any) => void) => {
      func(1);
      return new Subscription(() => {});
    });
    spyOn(calendarService, 'changeTopicDate').and.returnValue(Observable.of(new Schedule(0, [], new Curriculum())));

    spyOn(statusService, 'updateNextStatus').and.returnValue('Test string: updateNextStatus');
    spyOn(statusService, 'getStatusColor').and.returnValue('purple');
    spyOn(statusService, 'updateMovedStatus').and.returnValue('Test string: updateMovedStatus');

    spyOn(addSubtopicService, 'addNewScheduledSubtopic').and.returnValue(Observable.of(
      new ScheduledSubtopic(5, 5, new ScheduledDate(25, 26, 27, 28, 29))));
    spyOn(addSubtopicService, 'updateSchedule').and.returnValue(Observable.of(new Schedule(0, [], new Curriculum())));

    spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(Observable.of([
      new Subtopic(0, 'STopic1', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Started',  {topicID: 1, topicName: 'Topic1'}),
      new Subtopic(1, 'STopic2', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Complete', {topicID: 2, topicName: 'Topic2'}),
      new Subtopic(2, 'STopic3', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Pending', {topicID: 3, topicName: 'Topic3'}),
      new Subtopic(3, 'STopic4', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Planned', {topicID: 4, topicName: 'Topic4'}),
      new Subtopic(4, 'STopic5', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Complete', {topicID: 5, topicName: 'Topic5'})
    ]));

    spyOn(sessionStorage, 'getItem').and.callFake((param: string) => {
      if (param === 'batch') {
        const tempUser: BamUser = new BamUser(777, 'SessionStorage', 'Batch', 'Trainer', 'trainer@fake.email',
          'password', 0, null, '123-456-7890', '098-765-4321', 'SSBatchTrainer', 'notPassword', 0);
        const tempBatch: Batch = new Batch(0, 'SessionStorageBatch', new Date(2018, 1, 1), new Date(2019, 1, 1),
          tempUser, 0, 1);
          // tempUser cannot reference tempBatch because JSON.stringify throws a circular structure error
        return JSON.stringify(tempBatch);
      }
      return ('{}');
    });

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should initialize to default values', () => {
    sessionStorageSetItemSpy.calls.reset();
    // Generate expectations
    const tempUser: BamUser = new BamUser(777, 'SessionStorage', 'Batch', 'Trainer', 'trainer@fake.email',
      'password', 0, null, '123-456-7890', '098-765-4321', 'SSBatchTrainer', 'notPassword', 0);
    const expectedBatch: Batch = new Batch(0, 'SessionStorageBatch', new Date(2018, 1, 1), new Date(2019, 1, 1),
      tempUser, 0, 1);
    const expectedSchedule = new Schedule(
      0,
      [
        new ScheduledSubtopic(0, 0, new ScheduledDate(0, 0, 1, 1, 1)),
        new ScheduledSubtopic(1, 1, new ScheduledDate(0, 0, 1, 1, 1)),
        new ScheduledSubtopic(2, 2, new ScheduledDate(0, 0, 1, 1, 1)),
        new ScheduledSubtopic(3, 3, new ScheduledDate(0, 0, 1, 1, 1)),
        new ScheduledSubtopic(4, 4, new ScheduledDate(0, 0, 1, 1, 1))
      ],
      new Curriculum()
    );
    const expectedSubtopics = [
      new Subtopic(0, 'STopic1', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Started',  {topicID: 1, topicName: 'Topic1'}),
      new Subtopic(1, 'STopic2', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Complete', {topicID: 2, topicName: 'Topic2'}),
      new Subtopic(2, 'STopic3', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Pending', {topicID: 3, topicName: 'Topic3'}),
      new Subtopic(3, 'STopic4', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Pending', {topicID: 4, topicName: 'Topic4'}),
      new Subtopic(4, 'STopic5', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Complete', {topicID: 5, topicName: 'Topic5'})
    ];
    const expectedSubtopicEvents = [
      new CalendarEvent(),
      new CalendarEvent(),
      new CalendarEvent(),
      new CalendarEvent(),
      new CalendarEvent()
    ];

    // Create Spies
    spyOn(component, 'addEvent');

    // Call function
    component.ngOnInit();

    // Check for expectations
    expect(component.selectedBatch).toEqual(JSON.parse(JSON.stringify(expectedBatch)));
    expect(component.schedule).toEqual(expectedSchedule);
    expect(component.scheduledSubtopics).toEqual(expectedSchedule.subtopics);

    expect(component.addEvent).toHaveBeenCalled();
    expect(sessionStorageSetItemSpy).toHaveBeenCalledTimes(2);
    if (sessionStorageSetItemSpy.calls.count() === 2) {
      const functionCallsArr: jasmine.CallInfo[] = sessionStorageSetItemSpy.calls.all();
      expect(functionCallsArr[0].args).toEqual(['schedule', JSON.stringify(expectedSchedule)]);
      expect(functionCallsArr[1].args).toEqual(['subtopics', JSON.stringify(expectedSubtopics)]);
    } else {
      fail('sessionStorage.setItem was not called twice');
    }
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should call fc.gotoDate and fc.changeView', () => {
    spyOn(component.fc, 'gotoDate');
    spyOn(component.fc, 'changeView');

    component.jumpToDate('Test');

    expect(component.fc.gotoDate).toHaveBeenCalled();
    expect(component.fc.changeView).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should call updateEvent, fc.updateEvent, and calendarService.updateTopicStatus', () => {
    const expectedEvent = new CalendarEvent();
    expectedEvent.title = 'Test Event: handleEventClickStart';
    expectedEvent.subtopicName = 'STopic1';
    expectedEvent.subtopicId = 0;
    expectedEvent.status = 'Test String: updateNextStatus';
    expectedEvent.start = new Date();
    expectedEvent.color = 'purple';
    const paramObject = {calEvent: expectedEvent};

    spyOn(component, 'mapSubtopicFromEvent').and.returnValue(expectedEvent);
    spyOn(component, 'updateEvent');
    spyOn(component.fc, 'updateEvent');

    component.handleEventClick(paramObject);

    expect(calendarServiceUpdateTopicSpy).toHaveBeenCalledWith(expectedEvent, 0);
    expect(component.updateEvent).toHaveBeenCalledWith(expectedEvent);
    expect(component.fc.updateEvent).toHaveBeenCalledWith(expectedEvent);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should set draggedCalendarEvent equal to provided event ', () => {
    const expectedEvent = new CalendarEvent();
    expectedEvent.title = 'Test Event: handleEventDragStart';
    expectedEvent.subtopicName = 'STopic1';
    expectedEvent.subtopicId = 0;
    expectedEvent.status = 'Test';
    expectedEvent.start = new Date();
    expectedEvent.color = 'Test Color Please Ignore';
    const paramObject = {event: expectedEvent};

    component.handleEventDragStart(paramObject);

    expect(component.draggedCalendarEvent).toEqual(expectedEvent);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should call updateSchedule, updateEvent, and fc.updateEvent', () => {
    const paramEvent = new CalendarEvent();
    paramEvent.title = 'Test Event: handleEventDropStart';
    paramEvent.subtopicName = 'STopic1';
    paramEvent.subtopicId = 0;
    paramEvent.status = 'Test string: updateMovedStatus';
    paramEvent.start = new Date();
    paramEvent.color = 'purple';
    const paramObject = {event: paramEvent};

    spyOn(component, 'updateSchedule');
    spyOn(component, 'updateEvent');
    spyOn(component.fc, 'updateEvent');

    component.handleEventDrop(paramObject);

    expect(component.updateSchedule).toHaveBeenCalled();
    expect(component.updateEvent).toHaveBeenCalledWith(paramEvent);
    expect(component.fc.updateEvent).toHaveBeenCalledWith(paramEvent);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it('should update the startTime of a specific subtopic', () => {
    component.subtopics = [
      new Subtopic(777, 'TestSubtopic', new Date(2044, 1), new Date(2077, 1), 'Test Status', new Topic()),
      new Subtopic(778, 'TestSubtopic', new Date(2020, 2), new Date(2019, 1), 'Test Status', new Topic())
    ];
    component.schedule = new Schedule(
      0,
      [
        new ScheduledSubtopic(1, 778, new ScheduledDate(0, 0, 1, 1, 1)),
        new ScheduledSubtopic(0, 777, new ScheduledDate(0, 0, 1, 1, 1))
      ],
      new Curriculum()
    );
    const paramEvent = new CalendarEvent();
    paramEvent.title = 'Test Event: handleEventDropStart';
    paramEvent.subtopicName = 'STopic1';
    paramEvent.subtopicId = 777;
    paramEvent.status = 'TestStatus';
    paramEvent.start = new Date(2022, 3);
    paramEvent.color = 'TestColor';

    component.updateSchedule(paramEvent);

    expect(component.subtopics[0].startTime).toEqual(new Date(2044, 1));
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should create a new scheduled subtopic, add it to the schedule, then return it', () => {
    const paramDate = new Date();
    component.selectedBatch.startDate = paramDate;
    const paramEvent = new CalendarEvent();
    paramEvent.title = 'Test Event: handleEventDropStart';
    paramEvent.subtopicName = 'STopic1';
    paramEvent.subtopicId = 0;
    paramEvent.status = 'TestStatus';
    paramEvent.start = paramDate;
    paramEvent.color = 'TestColor';

    const expectedSubtopic = new ScheduledSubtopic(0, 0, new ScheduledDate(
      0, paramDate.getDay(), 1, paramDate.getTime(), paramDate.getTime() + 1));

    const returnedSubtopic = component.addSubtopicToSchedule(paramEvent);

    expect(component.schedule.subtopics).toContain(expectedSubtopic);
    expect(component.schedule.subtopics).toContain(returnedSubtopic);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * I'll come back to this. jQuery, and the lack of knowledge of jQuery, is presenting issues with testing
   */
  // it('should call handleDrop', () => {
  //   const expectedEvent = new CalendarEvent();
  //   expectedEvent.title = 'Test Event: handleEventDropStart';
  //   expectedEvent.subtopicName = 'STopic1';
  //   expectedEvent.subtopicId = 0;
  //   expectedEvent.status = 'TestStatus';
  //   expectedEvent.start = new Date(2022, 1);
  //   expectedEvent.color = 'TestColor';

  //   const expectedSubtopic: any = new Subtopic(0, 'STopic1', new Date(2018, 1, 1), new Date(2019, 1, 1), 'Started',
  //     {topicID: 1, topicName: 'Topic1'});
  //   expectedSubtopic.color = 4;

  //   const expectedScheduledSubtopic = new ScheduledSubtopic(0, 0, new ScheduledDate(0, 0, 0, 0, 0));

  //   spyOn($(), 'data').and.returnValue(new Subtopic(0, 'TestSubtopic', new Date(2044, 1), new Date(2077, 1),
  //    'Test Status', new Topic()));
  //   spyOn(component, 'updateEvent');
  //   spyOn(component.fc, 'updateEvent');
  //   spyOn(component, 'eventExists').and.returnValue(-1);

  //   component.handleDrop({jsEvent: {target: 'STopic1'}, resourceId: {name: 'month'}, date: new Date(2022, 1),
  //    start: new Date(2022, 1), color: 'TestColor'});

  //   expect(component.updateEvent).toHaveBeenCalled();
  //   expect(component.fc.updateEvent).toHaveBeenCalled();
  //   expect(component.schedule.subtopics[component.schedule.subtopics.length - 1]).toEqual(expectedScheduledSubtopic);
  // });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set properties related to tooltips', () => {
    const paramEvent = {
      view: {name: 'month'},
      calEvent: new CalendarEvent(),
      jsEvent: {target: {getBoundingClientRect() {return {top: 0}; }}, clientX: 0}
    };
    paramEvent.calEvent.color = 'TestColor';
    paramEvent.calEvent.start = new Date(0, 0, 0, 3, 44, 0, 0);
    paramEvent.calEvent.status = 'TestStatus';
    paramEvent.calEvent.subtopicId = 0;
    paramEvent.calEvent.subtopicName = 'STopic1';
    paramEvent.calEvent.title = 'TestTitle';

    component.handleEventMouseover(paramEvent);

    // handleEventMouseover seems to call the non-existant function of Date.format()
    // spyOn(paramEvent.calEvent.start, 'format').and.returnValue('3:44 0');

    expect(component.subtopicTooltip).toEqual('TestTitle');
    expect(component.statusTooltip).toEqual('TestStatus');
    expect(component.timeTooltip).toEqual('3:44 0');

    expect(component.status.nativeElement.style.background).toEqual('purple');
    expect(component.tooltip.nativeElement.style.display).toEqual('inline');
    expect(component.tooltip.nativeElement.style.top).toEqual((0 - component.body.nativeElement.getBoundingClientRect().top + 120) +
     'px');
    expect(component.tooltip.nativeElement.style.left).toEqual('0px');
    expect(component.tooltip.nativeElement.style.pointerEvents).toEqual('none');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set tooltip display to none', () => {
    component.tooltip.nativeElement.style.display = 'Test';

    component.handleEventMouseout('');

    expect(component.tooltip.nativeElement.style.display).toEqual('none');
  });



  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set the gotoDateValue', () => {
    const expectedDate: Date = new Date(component.fc.getDate().stripTime().format() + 'T09:00:00-05:00');
    component.gotoDateValue = new Date(2017, 1);

    component.handleViewRender('');

    expect(component.gotoDateValue).toEqual(expectedDate);
  });

});
