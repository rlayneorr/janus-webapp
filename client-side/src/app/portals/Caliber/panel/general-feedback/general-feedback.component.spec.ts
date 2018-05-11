import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { GeneralFeedbackComponent } from './general-feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('GeneralFeedbackComponent', () => {
  let component: GeneralFeedbackComponent;
  let fixture: ComponentFixture<GeneralFeedbackComponent>;
  const spy = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        GeneralFeedbackComponent,
      ],
    }).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('general feedback form is valid', () => {
    expect(component.generalFeedback.valid).toBeTruthy();
  });

  it('associateIntro field (in the general feedback form) is valid.', () => {
    const associateIntro = component.generalFeedback.controls['associateIntro'];
    expect(associateIntro).toBeTruthy();

    let errors = {};
    errors = associateIntro.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('projectOneDescription field (in the general feedback form) is valid.', () => {
    const projectOneDescription = component.generalFeedback.controls['projectOneDescription'];
    expect(projectOneDescription).toBeTruthy();

    let errors = {};
    errors = projectOneDescription.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('projectTwoDescription field (in the general feedback form) is valid.', () => {
    const projectTwoDescription = component.generalFeedback.controls['projectTwoDescription'];
    expect(projectTwoDescription).toBeTruthy();

    let errors = {};
    errors = projectTwoDescription.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('projectThreeDescription field (in the general feedback form) is valid.', () => {
    const projectThreeDescription = component.generalFeedback.controls['projectThreeDescription'];
    expect(projectThreeDescription).toBeTruthy();

    let errors = {};
    errors = projectThreeDescription.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('communicationSkills field (in the general feedback form) is valid.', () => {
    const communicationSkills = component.generalFeedback.controls['communicationSkills'];
    expect(communicationSkills).toBeTruthy();

    let errors = {};
    errors = communicationSkills.errors || {};
    expect(errors['required']).toBeFalsy();
  });
});
