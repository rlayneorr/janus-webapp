import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyFeedbackComponent } from './weekly-feedback.component';
import { Dependencies } from '../../../../app.test.module';
import { Trainee } from '../../entities/Trainee';


describe('WeeklyFeedbackComponent', () => {
  let component: WeeklyFeedbackComponent;
  let fixture: ComponentFixture<WeeklyFeedbackComponent>;
  let trainee: Trainee;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
