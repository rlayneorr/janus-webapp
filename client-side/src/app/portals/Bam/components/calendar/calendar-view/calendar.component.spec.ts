
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

fdescribe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  // Spies that need to be referenced later

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }));

  beforeEach(() => {

    const calendarServce: CalendarService = TestBed.get(CalendarService);
    const statusService: CalendarStatusService = TestBed.get(CalendarStatusService);
    const addSubtopicService: AddSubtopicService = TestBed.get(AddSubtopicService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    const sessionService: SessionService = TestBed.get(SessionService);

    // Create spies that need to be referenced later

    // Create other spies


    //  // getting testbed services
    //  const calendarService: CalendarService = TestBed.get(CalendarService);
    //  const subtopicService: SubtopicService = TestBed.get(SubtopicService);

    //  testTopic = new Topic();
    //  testTopic.topicID = 1;
    //  testTopic.topicName = 'testName';
    //  subtopic = new Subtopic(1, 'testName', new Date(), new Date(), '', testTopic);
    //  const subArr: Subtopic[] = [];
    //  subArr.push(subtopic);
    //  subtopic.parentTopic = testTopic;
    //  const testBatch = new Batch(1, '', null, null, null, 2, 2);
    //  const testschDate = new ScheduledDate(1, 1, 1, 1, 1);
    //  const testsub = new ScheduledSubtopic(1, 1, testschDate);
    //  const tsub: ScheduledSubtopic[] = [];
    //  const tCurr = new Curriculum();
    //  tsub.push(testsub);
    //  const testSched = new Schedule(1, tsub , tCurr);

    //  const t = JSON.stringify(testBatch);
    //  const jSched = JSON.stringify(testSched);
    //  // returning JSON when sessionStorage is called
    //  spyOn(sessionStorage, 'getItem').and.callFake((batch) => {
      //    if (batch === 'batch') {
        //     return t;
        //    }
        //    if (batch === 'schedule') {
          //     return jSched;
          //   }
          //  });
          //  const a: number[] = [1];

          //  // spying on service to return mock values
          //  spyOn(calendarService, 'getScheduleByScheduleId').and.returnValue(Observable.of(a));
          //  spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(Observable.of(subArr));
          //  TestBed.overrideProvider(CalendarComponent, {useValue: calendarService});

          fixture = TestBed.createComponent(CalendarComponent);
          component = fixture.componentInstance;
          fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call ngOnInit', () => {
  //   spy = spyOn(component, 'ngOnInit').and.callThrough();
  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // });
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
