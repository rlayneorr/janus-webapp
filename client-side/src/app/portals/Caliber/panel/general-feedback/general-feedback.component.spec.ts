import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { GeneralFeedbackComponent } from './general-feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

<<<<<<< HEAD
describe('GeneralFeedbackComponent', () => {
=======
fdescribe('GeneralFeedbackComponent', () => {
>>>>>>> 4da8f3f409da8ea13cf0800acb581b7e1945c7a7
  let component: GeneralFeedbackComponent;
  let fixture: ComponentFixture<GeneralFeedbackComponent>;

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
});
