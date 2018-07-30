import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BucketComponent} from './bucket.component';
import {Dependencies} from '../../../caliber.test.module';

fdescribe('BucketComponent', () => {
  let component: BucketComponent;
  let fixture: ComponentFixture<BucketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule( (Dependencies)
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
