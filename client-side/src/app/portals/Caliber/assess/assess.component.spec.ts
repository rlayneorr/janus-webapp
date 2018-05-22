import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessComponent } from './assess.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BatchService } from '../services/batch.service';
import { AssessmentService } from '../services/assessment.service';
import { GradeService } from '../services/grade.service';
import { GambitSkillService } from '../../../hydra-client/services/skill/gambit-skill.service';
import { NoteService } from '../services/note.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertsService } from '../services/alerts.service';
import { Dependencies } from '../caliber.test.module';

xdescribe('AssessComponent', () => {
  let component: AssessComponent;

  let fixture: ComponentFixture<AssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessComponent);
    component = fixture.componentInstance;
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
