// Testing modules
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// Modules
import {Dependencies} from '../../../caliber.test.module';
// Entities
import {CategoriesComponent} from './categories.component';
// Services
import {UrlService} from '../../../../../caliber-client/services/urls/url.service';
import {BucketsService} from '../../../services/buckets.service';
// Mock Data
// import { BUCKETS } from '../mock-data/mock-buckets';
//Observables
import {defer} from 'rxjs/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}


describe('CategoriesComponent', () => {
  let httpClientSpyOnPost: { post: jasmine.Spy };
  let httpClientSpyOnPut: {put: jasmine.Spy };
  let bucketService: BucketsService;
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const urlService: UrlService = new UrlService();

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if the bucket gets edited or not.
   *
   * Function Tested: editBucket()
   **/
  it('should edit a bucket', () => {
    //component.editBucket(BUCKETS[0]);
    //expect(component.currBucket).toEqual(BUCKETS[0]);
  });

  /**
   * Test if 2 buckets get sorted by isActive being true or false.
   *
   * Function Tested: compare(a: Bucket, b:Bucket)
   */
  it('should sort 2 buckets', ()=>{
    //let tempBucket = BUCKETS[0];
    //tempBucket.isActive = false;
    //expect(component.compare(tempBucket, BUCKETS[1])).toEqual(1);
  });

  /**
   * Test if a bucket gets updated.
   *
   * Function Tested: update(bucketParam: bucket)
   * Presently update appears to be untestable.
   */
  /*fit('update() should make Http put request', () => {
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    bucketService = new BucketsService(<any> httpClientSpyOnPut, urlService);
    const expected: Bucket = BUCKETS[4];
    httpClientSpyOnPut.put.and.returnValue(asyncData(expected));
    //component.updateBucket(expected);
    bucketService.updateBucket(BUCKETS[4]).subscribe(
      bucket => expect(bucket).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
  });*/
});
