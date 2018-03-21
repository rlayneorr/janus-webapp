import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStructureComponent } from './course-structure.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';

describe('CourseStructureComponent', () => {
  let component: CourseStructureComponent;
  let fixture: ComponentFixture<CourseStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
