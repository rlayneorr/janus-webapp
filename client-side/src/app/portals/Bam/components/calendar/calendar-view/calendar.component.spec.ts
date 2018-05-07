
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
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

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  // Spies that need to be referenced later
  let sessionStorageSetItemSpy: jasmine.Spy;

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
    spyOn(calendarService, 'mapSubtopicToEvent').and.returnValue(new CalendarEvent());
    spyOn(calendarService.addCalendarEvent, 'subscribe').and.callFake((func: (value: any) => void) => {
      func(1);
      return new Subscription(() => {});
    });
    spyOn(calendarService, 'updateTopicStatus').and.returnValue(Observable.of('Test string: updateTopicStatus'));
    spyOn(calendarService, 'changeTopicDate').and.returnValue(Observable.of(new Schedule(0, [], new Curriculum())));

    spyOn(statusService, 'updateNextStatus').and.returnValue('Test string: updateNextStatus');
    spyOn(statusService, 'getStatusColor').and.returnValue('Test string: getStatusColor');
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

  // it('should call jumpToDate', () => {
  //   spyOn(component, 'jumpToDate').and.callThrough();
  //   component.jumpToDate(new Date());
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call handleEventClick', () => {
  //   spyOn(component, 'handleEventClick').and.callThrough();
  //   component.handleEventClick('test');
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call handleEventDragStart', () => {
  //   spyOn(component, 'handleEventDragStart').and.callThrough();
  //   component.handleEventDragStart('test');
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call handleEventDrop', () => {
  //   spyOn(component, 'handleEventDrop').and.callThrough();
  //   component.handleEventDrop('test');
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call updateSchedule', () => {
  //   spyOn(component, 'updateSchedule').and.callThrough();
  //   component.updateSchedule('test');
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call handleDrop', () => {
  //   spyOn(component, 'handleDrop').and.callThrough();
  //   component.handleDrop('test');
  //   expect(spy).toHaveBeenCalled();
  // });

});
