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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../../../services/alert.service';

/**
 * @author David Graves
 * @batch 1712
 *
 * This particular component required specific dependencies that were different than other
 * components. So changes to the Dependencies class in TestModule and TestObservableModule will not
 * reflect here.
 *
 */
describe('EditBatchComponent', () => {
  let component: EditBatchComponent;
  let fixture: ComponentFixture<EditBatchComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ EditBatchComponent ],
      imports: [ HttpClientModule, RouterModule, BrowserAnimationsModule,
      RouterTestingModule.withRoutes([]) ],
      providers: [BatchService, SessionService, UsersService,
        LocationStrategy, AlertService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
