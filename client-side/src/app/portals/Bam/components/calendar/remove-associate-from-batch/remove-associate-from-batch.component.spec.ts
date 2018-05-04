import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAssociateFromBatchComponent } from './remove-associate-from-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SearchPipe } from '../../../pipes/search.pipe';
import { UsersService } from '../../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Batch } from '../../../models/batch.model';
import { BamUser } from '../../../models/bamuser.model';
import { SessionService } from '../../../services/session.service';
import { BatchType } from '../../../models/batchtype.model';
import { Observable } from 'rxjs/Observable';

/**
 * @author David Graves, Cristian Hermida
 * @batch 1712
 * Had to stub SessionService. It retrieved an object from sessionStorage,
 * which is not available during testing. Had to provide mock data.
 */

// export class StubSessionService {
//   bamUser: BamUser;
//   stubBatch: Batch;

//   constructor() {
//       this.bamUser = {
//         'userId': 3,
//         'firstName': 'Ryan',
//         'middleName': null,
//         'lastName': 'Lessley',
//         'email': 'rl@revature.com',
//         'pwd': '1234',
//         'role': 2,
//         'batch': null,
//         'phone': '1234567890',
//         'phone2': '8675309',
//         'skype': 'rl_skype',
//         'pwd2': null,
//         'assignForceID': 9
//     };
//   }

//   getSelectedBatch(): Batch {

//     this.stubBatch = new Batch(12, 'name', new Date(), new Date(),
//     this.bamUser, 101, 302);

//     return this.stubBatch;
//   }

// }

describe('RemoveAssociateFromBatchComponent', () => {
  let component: RemoveAssociateFromBatchComponent;
  let fixture: ComponentFixture<RemoveAssociateFromBatchComponent>;


  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [RemoveAssociateFromBatchComponent, SearchPipe],
    //   imports: [ HttpClientModule ],
    //   providers: [UsersService, {provide: SessionService, useClass: StubSessionService}],
    //   schemas: []
    // }).compileComponents();

    TestBed.configureTestingModule(Dependencies).compileComponents();
  }));

  beforeEach(() => {

    const sessionService: SessionService = TestBed.get(SessionService);
    const usersService: UsersService = TestBed.get(UsersService);

    spyOn(sessionService, 'getSelectedBatch').and.returnValue(new Batch(1, null, null, null, null, 0, 0));
    spyOn(usersService, 'getUsersInBatch').and.returnValue(Observable.of(
      [
        new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
      ]));

      spyOn(usersService, 'removeUserFromBatch').and.callFake((userId: number) => {
        if (userId === 0) {
          return Observable.of([
            new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
            new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
            new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
            new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
            new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
          ]);
        } else {
          return Observable.throw('Test');
        }
      });

    fixture = TestBed.createComponent(RemoveAssociateFromBatchComponent);
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
  it ('should emit an event with the type and message provided to associateAlert', (done) => {
    component.notify.subscribe((event) => {
      expect(event.type).toEqual('Test');
      expect(event.message).toEqual('This is a test.');
      done();
    });

    component.associateAlert('Test', 'This is a test.');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should tell the usersService to remove the user with the given user\'s id from the \
  batch, then set associates to the updated user list and notify the user if successful', () => {
    spyOn(component, 'associateAlert');
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];
    const expectedArr = [
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    component.removeUser(new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0));

    expect(component.associateAlert).toHaveBeenCalled();
    expect(component.associates).toEqual(expectedArr);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should leave associates unchanged and alert user of failure if the given user cannot be removed from a batch', () => {
    spyOn(component, 'associateAlert');
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];
    const expectedArr = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    component.removeUser(new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0));

    expect(component.associateAlert).toHaveBeenCalled();
    expect(component.associates).toEqual(expectedArr);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should do nothing if no match is found', () => {
    spyOn(component, 'associateAlert');
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];
    const expectedArr = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    component.removeUser(new BamUser(7, null, null, null, null, null, 0, null, null, null, null, null, 0));

    expect(component.associateAlert).not.toHaveBeenCalled();
    expect(component.associates).toEqual(expectedArr);
  });

});
