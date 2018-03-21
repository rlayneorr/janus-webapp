import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingSubtopicModalComponent } from './existing-subtopic-modal.component';
import { Dependencies } from '../../../bam.test.module';

describe('ExistingSubtopicModalComponent', () => {
  let component: ExistingSubtopicModalComponent;
  let fixture: ComponentFixture<ExistingSubtopicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ExistingSubtopicModalComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingSubtopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
