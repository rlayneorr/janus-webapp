import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { PanelOverallFeedbackComponent } from './panel-overall-feedback.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('PanelOverallFeedbackComponent', () => {
  let component: PanelOverallFeedbackComponent;
  let fixture: ComponentFixture<PanelOverallFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, FormsModule
      ],
      declarations: [
        PanelOverallFeedbackComponent
      ],
    }).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOverallFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
