import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { SessionService } from '../../../services/session.service';
import { BatchService } from '../../../services/batch.service';
import { DebugElement } from '@angular/core';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs/Observable';
import { Batch } from '../../../models/batch.model';
import { of } from 'rxjs/observable/of';




fdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let batchService: BatchService;
  let sessionService: SessionService;
  let usersService: UsersService;
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
  const batch2 = {
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
  const batch3 = {
    'id' : 321,
    'name' : 'batch',
    'startDate' : new Date(),
    'endDate' : new Date(),
    'trainer' : null,
    'trainerID' : 123,
    'curriculum' : null,
    'curriculumID' : 123,
    'scheduleID' : 123
  };


  TestBed.overrideProvider(SessionService, {useValue: sessionService});
  TestBed.overrideProvider(UsersService, {useValue: usersService});

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


        // batchServiceMock = {
        //   isLoggedIn: true,
        //   user: { name: 'Test User'}
        // };

        // inject the service
          // spyOn(sessionService, 'getUser').and.returnValue(new BamUser(1, '', '', '', '', '', 0, null, '', '', '', '', 1));
          // spyOn(usersService, 'getUserByID').and.returnValue(Observable.of(new BamUser(2, 'TestF', 'TestM', 'TestL',
          // 'test@fake.email', 'password', 1, null, '123-456-7890', '098-765-4321', 'TestSkype', 'notPassword', 234)));
  });


  // checks each function if active
  it('checking NgOnit function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('checking getInProgressBatches function', () => {
    expect(component.getInProgressBatches).toBeTruthy();
  });

  it('checking setSelected function', () => {
    expect(component.setSelected).toBeTruthy();
  });

  it('checking setAllneededVars function', () => {
    expect(component.setAllneededVars).toBeTruthy();
  });

  it('checking compareBatch function', () => {
    expect(component.compareBatch).toBeTruthy();
  });

  // NGOnit testing bam user from sessionService
  it('testing user in NgOnit', () => {
    spyOn (sessionService, 'getUser');
    expect(sessionService.getUser.name).toEqual('Ryan');
  });

  // it('testing calling NgOnit'), () => {
    //   spyOn(component, 'ngOnInit');
    //   component.ngOnInit();
    //   expect(component.ngOnInit).toHaveBeenCalled();
    // }

// checks getInProgressBatches method
it('checks if getbatchall called when getInProgressBatches run', () => {
  spyOn(batchService, 'getBatchAll').and.returnValue(null);
  component.getInProgressBatches();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(batchService.getBatchAll).toHaveBeenCalled();
  expect(component.batchCount).toBe(0);
});

it('checks getbatchall if returns value', () => {
  spyOn(batchService, 'getBatchAll').and.returnValue(batch);
  batchService.getBatchAll().subscribe(
    (success) => {
      expect(success).toBeDefined();
    //  expect(success).toBeCloseTo(batch);
    }
  );
});

// checks setSelected method
it('checking setSelected if sessionService is called ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession');
  component.setSelected();
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

it('checking sessionService stores batch', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession');
  sessionService.putSelectedBatchIntoSession(batch);
  expect(batch).toEqual(sessionService.getSelectedBatch());
});



// checking setAllneededVars method
it('checks when batchCount is zero message is apporiate', () => {
  spyOn (component, 'setAllneededVars');
  const batchCount = 0;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(component.message).toEqual('You have no current batches');
});

it('checks when batchCount is 2 message is apporiate', () => {
  spyOn (component, 'setAllneededVars');
  const batchCount = 2;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(component.message).toEqual('You have more than one current batch');
});

it('checkis if batchcount = 1 then to have putSelectedBatchIntoSession to be called ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession');
  const batchCount = 1;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

// checks compareBatch method
it('checks that batch1 and batch are equal they are', () => {
spyOn (component, 'compareBatch');
expect(component.compareBatch(batch, batch2)).toBe(true);
});

it('checks that batch3 and batch are equal they are not', () => {
  spyOn (component, 'compareBatch');
  expect(component.compareBatch(batch, batch3)).toBe(false);
  });

// extra should be removed
it('checking add functiontion', inject([WelcomeComponent], (serviceT: WelcomeComponent) => {
  expect(serviceT.add).toBeTruthy();
}));

it('should add equal 3', inject([WelcomeComponent], (serviceT: WelcomeComponent) => {
  expect(serviceT.add(1, 2)).toEqual(3);
}));

});
