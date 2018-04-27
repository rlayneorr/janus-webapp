import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { SessionService } from '../../../services/session.service';
import { BatchService } from '../../../services/batch.service';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Batch } from '../../../models/batch.model';




fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let batchService: BatchService;
  let sessionService: SessionService;
  let usersService: UsersService;
  let httpMock: HttpTestingController;

  //  let batchServiceMock: Partial<BatchService>;


  TestBed.overrideProvider(SessionService, {useValue: sessionService});
  TestBed.overrideProvider(UsersService, {useValue: usersService});

  // class MockBatchService {
    //   getBatchAll(): Observable<Batch[]>{
      //   }
      // }

      beforeEach(async(() => {
        TestBed.configureTestingModule(Dependencies).compileComponents();
      }), 1440000);

      beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        sessionService = TestBed.get(SessionService);
        usersService = TestBed.get(UsersService);
        batchService = TestBed.get(BatchService);
        httpMock = TestBed.get(HttpTestingController);

        // batchServiceMock = {
        //   isLoggedIn: true,
        //   user: { name: 'Test User'}
        // };

        // inject the service
          spyOn(sessionService, 'getUser').and.returnValue(new BamUser(1, '', '', '', '', '', 0, null, '', '', '', '', 1));
          spyOn(usersService, 'getUserByID').and.returnValue(Observable.of(new BamUser(2, 'TestF', 'TestM', 'TestL',
          'test@fake.email', 'password', 1, null, '123-456-7890', '098-765-4321', 'TestSkype', 'notPassword', 234)));
  });


  // checks each function if active
  it('checking NgOnit functiontion', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('checking getInProgressBatches functiontion', () => {
    expect(component.getInProgressBatches).toBeTruthy();
  });

  it('checking setSelected functiontion', () => {
    expect(component.setSelected).toBeTruthy();
  });

  it('checking setAllneededVars functiontion', () => {
    expect(component.setAllneededVars).toBeTruthy();
  });

  it('checking compareBatch functiontion', () => {
    expect(component.compareBatch).toBeTruthy();
  });

  // NGOnit testing comming back
  // it('testing user in NgOnit'), () => {
  //   expect(this.getUser).toEqual(component.currentUser);
  // }

  // it('testing calling NgOnit'), () => {
    //   spyOn(component, 'ngOnInit');
    //   component.ngOnInit();
    //   expect(component.ngOnInit).toHaveBeenCalled();
    // }

    // testing getInProgressBatches
    // it('testing method this batch count should = 0 ', () => {
    //   const input = findElement(fixture, 'input');
    //   expect(component.getInProgressBatches).toBeDefined();
    // });

it('checks if batch service getbatchall called when getInProgressBatches run', () => {
  spyOn(batchService, 'getBatchAll').and.returnValue(null);
  component.getInProgressBatches();
  expect(batchService.getBatchAll).toHaveBeenCalled();
  expect(component.batchCount).toBe(0);
});

it('checking getInProgressBatches batchcount === 0 if not talking with backend, but properly excuteing', () => {
  spyOn (component, 'getInProgressBatches');
  const batchCount = 1;
  component.getInProgressBatches();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(component.batchCount).not.toBeGreaterThanOrEqual(batchCount);
});

it('checking setSelected if sessionService is called ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession');
  component.setSelected();
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

it('checking setAllneededVars putSelectedBatchIntoSession got called when vaule < 1 ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.returnValue(Observable.of(0));
  component.setAllneededVars();
  expect(component.message).toEqual('You have no current batches');
});

it('checking setAllneededVars putSelectedBatchIntoSession got called when vaule > 1 ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.returnValue(Observable.of(2));
  component.setAllneededVars();
  expect(component.message).toEqual('You have more than one current batch');
});

it('checking setAllneededVars putSelectedBatchIntoSession got called when vaule = 1 ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.returnValue(Observable.of(1));
  component.setAllneededVars();
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

// it('checking compare batches', () => {
//   batchMock1 = {
//       id: 123
//     };
//   batchMock2 = {
//       id: 123
//     };
//   expect(component.compareBatch(batchMock1, batchMock2)).toBeTruthy;

// });

it('checking add functiontion', inject([WelcomeComponent], (serviceT: WelcomeComponent) => {
  expect(serviceT.add).toBeTruthy();
}));

it('should add equal 3', inject([WelcomeComponent], (serviceT: WelcomeComponent) => {
  expect(serviceT.add(1, 2)).toEqual(3);
}));

});
