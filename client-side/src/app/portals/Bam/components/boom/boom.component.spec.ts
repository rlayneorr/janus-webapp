import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { BoomComponent } from './boom.component';
import { Dependencies } from '../../bam.test-observable.module';
import { BatchService } from '../../services/batch.service';
import { CalendarService } from '../../services/calendar.service';
import { CurriculumService } from '../../services/curriculum.service';
import { SubtopicService } from '../../services/subtopic.service';
import { UsersService } from '../../services/users.service';
import { BoomUtil } from './boom.util';

fdescribe('BoomComponent', () => {
  let component: BoomComponent;
  let fixture: ComponentFixture<BoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    const batchService: BatchService = TestBed.get(BatchService);
    const calendarService: CalendarService = TestBed.get(CalendarService);
    const curriculumService: CurriculumService = TestBed.get(CurriculumService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    const usersService: UsersService = TestBed.get(UsersService);

    spyOn(batchService, 'getAllInProgress').and.returnValue(Observable.of(BoomUtil.makeBatches()));
    spyOn(curriculumService, 'getScheduleById').and.returnValue(Observable.of(BoomUtil.getScheduleById(2)));
    spyOn(usersService, 'getUserByID').and.returnValue(Observable.of(BoomUtil.getUserById(1)));
    spyOn(subtopicService, 'getSubtopicByIDs').and.returnValue(Observable.of(BoomUtil.getSubtopicById(3)));

    TestBed.overrideProvider(BatchService, { useValue: batchService });
    TestBed.overrideProvider(CurriculumService, { useValue: curriculumService });
    TestBed.overrideProvider(UsersService, { useValue: usersService });
    TestBed.overrideProvider(SubtopicService, { useValue: subtopicService });

    fixture = TestBed.createComponent(BoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize the Batches', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currentBatches).toEqual(BoomUtil.makeBatches());
  });

  it('get the week helper', () => {
    let date: Date = new Date(`04/jan/2018`);
    expect(component.getWeek(date.getTime())).toEqual(1);
    date = new Date('11/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(2);
    date = new Date('18/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(3);
    date = new Date('25/jan/2018');
    expect(component.getWeek(date.getTime())).toEqual(4);
  });

  it('change the batch', () => {
    component.ngOnInit();
    component.changeBatch(3);
    fixture.detectChanges();
    expect(component.chartHeight).toEqual(355);
    expect(component.barChartData.length).toEqual(0);
    expect(component.barChartLabels.length).toEqual(0);
  });

});
