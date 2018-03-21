import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtopicSearchComponent } from './subtopic-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('SubtopicSearchComponent', () => {
  let component: SubtopicSearchComponent;
  let fixture: ComponentFixture<SubtopicSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
