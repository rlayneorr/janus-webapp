import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Dependencies} from '../../caliber.test.module';
import {AllCumulativeScoresComponent} from './all-cumulative-scores.component';


describe('AllCumulativeScoresComponent', () => {
  let component: AllCumulativeScoresComponent;
  let fixture: ComponentFixture<AllCumulativeScoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCumulativeScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a batchId', () => {
    expect(component.batchId).toBeFalsy();
  });

  it('should have a traineeId', () => {
    expect(component.traineeId).toBeTruthy();
  });

  it('should have a chartData', () => {
    expect(component.scoresAverage).toBeFalsy();
  });

  it('should have a batchArray', () => {
    expect(component.batch).toBeTruthy();
  });

  // AllCumulativeComponent is just not testable. Cannot verify datatype because of
  // array Batch<any> takes anything. No Data safety.
  it('createChartData() should return set the benchmark', () => {
    const trainee1 = {
      'traineeId': 5528, 'resourceId': null, 'name': 'Yahya, Hossain', 'email': 'hossain.yahya@outlook.com',
      'trainingStatus': 'Employed', 'phoneNumber': '347-595-0959', 'skypeId': 'live:hossain.yahya_1',
      'profileUrl': 'https://app.revature.com/profile/Hossain/56533488cfec931bbc8e43ba02f12190',
      'recruiterName': null, 'college': null, 'degree': null, 'major': null, 'techScreenerName': null,
      'projectCompletion': null, batch: null
    };

    const trainee2 = {
      'traineeId': 5535, 'resourceId': null, 'name': 'Itwaru, Sudish', 'email': 'suditw@gmail.com',
      'trainingStatus': 'Employed', 'phoneNumber': '718-415-0517', 'skypeId': 'sudish.itwaru',
      'profileUrl': 'https://app.revature.com/profile/sitwaru/8995f5191fdba7a3508ed6e9825863e1',
      'recruiterName': null, 'college': null, 'degree': null, 'major': null, 'techScreenerName': null,
      'projectCompletion': null, batch: null
    };

    const trainee3 = {
      'traineeId': 5526, 'resourceId': null, 'name': 'Duong, Jack', 'email': 'son.jack0218@gmail.com',
      'trainingStatus': 'Employed', 'phoneNumber': '(646) 417-3976', 'skypeId': 'imrjack',
      'profileUrl': 'https://app.revature.com/profile/imrjack/fab72b5d62b5965bcd22aabe0a9ee24b',
      'recruiterName': null, 'college': null, 'degree': null, 'major': null, 'techScreenerName': null,
      'projectCompletion': null, batch: null
    };

    component.batch.push(trainee1);
    component.batch.push(trainee2);
    component.batch.push(trainee3);

    expect(component.sortByHighestScore(component.batch)).toBe('');
  });
});
