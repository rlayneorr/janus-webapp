import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchComponent } from './edit-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';
import { LocationStrategy } from '@angular/common';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../../../services/alert.service';
import { Batch } from '../../../models/batch.model';
import { Observable } from 'rxjs/Observable';
import { BatchType } from '../../../models/batchtype.model';
import { UrlService } from '../../../../../hydra-client/services/urls/url.service';

/**
 * @author David Graves
 * @batch 1712
 *
 * This particular component required specific dependencies that were different than other
 * components. So changes to the Dependencies class in TestModule and TestObservableModule will not
 * reflect here.
 *
 */
fdescribe('EditBatchComponent', () => {
  let component: EditBatchComponent;
  let fixture: ComponentFixture<EditBatchComponent>;

  // Service spies for testing if a function has been called
  let alertServiceAlertSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchComponent ],
      imports: [ HttpClientModule, RouterModule,
      RouterTestingModule.withRoutes([]) ],
      providers: [BatchService, SessionService, UsersService,
        LocationStrategy, AlertService, UrlService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    // Get the services that need to be spied on
    const alertService: AlertService = TestBed.get(AlertService);
    const sessionService: SessionService = TestBed.get(SessionService);
    const batchService: BatchService = TestBed.get(BatchService);

    // Set spies that need to be referenced later
    alertServiceAlertSpy = spyOn(alertService, 'alert');

    // Create other spies
    spyOn(sessionService, 'getSelectedBatch').and.returnValue(new Batch(0, 'TestBatch', null, null, null, 0, 0));
    spyOn(batchService, 'getAllBatchTypes').and.returnValue(Observable.of(
      [
        new BatchType(0, 'Type 1', 1),
        new BatchType(1, 'Type 1', 2),
        new BatchType(2, 'Type 1', 3),
        new BatchType(3, 'Type 1', 4),
        new BatchType(4, 'Type 1', 5)
      ]
    ));

    fixture = TestBed.createComponent(EditBatchComponent);
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
  it ('should call alertService.alert', () => {
    component.batchAlert(null, null);
    expect(alertServiceAlertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should call alertService.alert', () => {
    component.associateAlert({type: null, message: null});
    expect(alertServiceAlertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batch\'s end date to a provided date', () => {
    const newDate: Date = new Date();
    component.endDateChanged(newDate);
    expect(component.batch.endDate).toEqual(newDate);
  });
});
