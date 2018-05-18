import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { OverallFeedbackComponent } from './overall-feedback.component';
import { Note } from '../../entities/Note';
import { HydraBatchService } from '../../../../gambit-client/services/batch/hydra-batch.service';


describe('OverallFeedbackComponent439y298743', () => {
  let component: OverallFeedbackComponent;
  let fixture: ComponentFixture<OverallFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getNoteByWeek(data, 7) should return note1', () => {
    const note1 = new Note();
    note1.noteId = 1;
    note1.content = 'java';
    note1.week = 7;

    const note2 = new Note();
    note2.noteId = 2;
    note2.content = 'Angular';
    note2.week = 5;

    const data = new Array<Note>();
    data.push(note1);
    data.push(note2);

    expect(component.getNoteByWeek(data, 7)).toEqual(note1);
  });

  it('qcWeek(7) should return note1', () => {
    const note1 = new Note();
    note1.noteId = 1;
    note1.content = 'java';
    note1.week = 7;

    const note2 = new Note();
    note2.noteId = 2;
    note2.content = 'Angular';
    note2.week = 5;

    component.qcNotes.push(note1);
    component.qcNotes.push(note2);

    expect(component.qcWeek(7)).toEqual(note1);
  });

  it('traineeWeek(7) should return note1', () => {
    const note1 = new Note();
    note1.noteId = 1;
    note1.content = 'java';
    note1.week = 7;

    const note2 = new Note();
    note2.noteId = 2;
    note2.content = 'Angular';
    note2.week = 5;

    component.traineeNotes.push(note1);
    component.traineeNotes.push(note2);

    expect(component.traineeWeek(7)).toEqual(note1);
  });

  // Cannot touch some of the code due to the API calls.
  it('ngOnit() test with no backend', () => {
    component.ngOnInit();
  });

});
