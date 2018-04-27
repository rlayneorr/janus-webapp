import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { InterviewDetailsComponent } from './interview-details.component';

describe('InterviewDetailsComponent', () => {
  let component: InterviewDetailsComponent;
  let fixture: ComponentFixture<InterviewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('interviewDate field (in interviewForm) is valid and required.', () => {
    let interviewData = component.interviewForm.controls['interviewData'];
    expect(interviewData).toBeTruthy();

    let errors = {};
    errors = interviewData.errors || {};
    expect(errors['required'].toBeFalsy()); 
  });
});
