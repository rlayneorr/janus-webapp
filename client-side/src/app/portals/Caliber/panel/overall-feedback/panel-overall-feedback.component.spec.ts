import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { PanelOverallFeedbackComponent } from './panel-overall-feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GeneralFeedbackComponent } from '../general-feedback/general-feedback.component';

fdescribe('PanelOverallFeedbackComponent', () => {
  let component: PanelOverallFeedbackComponent;
  let fixture: ComponentFixture<PanelOverallFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [GeneralFeedbackComponent]
    })

    fixture = TestBed.createComponent(PanelOverallFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('overall feedback form is valid', () => {
    expect(component.overallFeedback.valid).toBeTruthy();
  });
  
  it('duration field (in the overall feedback form) is valid.', () => {
    let duration = component.overallFeedback.controls['duration']; 
    expect(duration).toBeTruthy();
    
    let errors = {};
    errors = duration.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });

  it('recordingLink field (in the overall feedback form) is valid.', () => {
    let recordingLink = component.overallFeedback.controls['recordingLink']; 
    expect(recordingLink).toBeTruthy();
    
    let errors = {};
    errors = recordingLink.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });

  it('status field (in the overall feedback form) is valid.', () => {
    let status = component.overallFeedback.controls['status']; 
    expect(status).toBeTruthy();
    
    let errors = {};
    errors = status.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });
  
  it('overall field (in the overall feedback form) is valid.', () => {
    let overall = component.overallFeedback.controls['overall']; 
    expect(overall).toBeTruthy();
    
    let errors = {};
    errors = overall.errors || {};
    expect(errors['required']).toBeFalsy(); 
  });
});
