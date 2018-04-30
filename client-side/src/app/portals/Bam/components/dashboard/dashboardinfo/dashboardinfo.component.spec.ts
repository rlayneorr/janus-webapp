import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoComponent } from './dashboardinfo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SessionService } from '../../../services/session.service';
import { BatchService } from '../../../services/batch.service';
import { Batch } from '../../../models/batch.model';
import { of } from 'rxjs/observable/of';
import { BamUser } from '../../../models/bamuser.model';


describe('DashboardInfoComponent', () => {
  let component: DashboardInfoComponent;
  let fixture: ComponentFixture<DashboardInfoComponent>;
  let batchService: BatchService;
  let sessionService: SessionService;
  let spy: any;
  const batch = {
    'id' : 123,
    'name' : 'batch',
    'startDate' : new Date(),
    'endDate' : new Date(),
    'trainer' : null,
    'trainerID' : 123,
    'curriculum' : null,
    'curriculumID' : 123,
    'scheduleID' : 123
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sessionService = TestBed.get(SessionService);
    batchService = TestBed.get(BatchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking NgOnit function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('checking batchSubscribe function', () => {
    expect(component.batchSubscribe).toBeTruthy();
  });

  it('checking setProperties function', () => {
    expect(component.setProperties).toBeTruthy();
  });

  // checking ngOnInit
  it('should call ngOnInit', () => {
    spy = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
 });

 it('checks batchSubscribe', () => {
  spyOn(component, 'batchSubscribe');
  component.batchSubscribe();

 });




});
