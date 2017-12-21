import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTrainersComponent } from './view-all-trainers.component';

describe('ViewAllTrainersComponent', () => {
  let component: ViewAllTrainersComponent;
  let fixture: ComponentFixture<ViewAllTrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllTrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
