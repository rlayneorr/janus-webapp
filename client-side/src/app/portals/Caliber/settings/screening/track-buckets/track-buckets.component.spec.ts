import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackBucketsComponent } from './track-buckets.component';

describe('TrackBucketsComponent', () => {
  let component: TrackBucketsComponent;
  let fixture: ComponentFixture<TrackBucketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackBucketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackBucketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
