import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesTableComponent } from './batches-table.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('BatchesTableComponent', () => {
  let component: BatchesTableComponent;
  let fixture: ComponentFixture<BatchesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
