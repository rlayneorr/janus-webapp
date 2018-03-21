import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociateToBatchComponent } from './add-associate-to-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';

describe('AddAssociateToBatchComponent', () => {
  let component: AddAssociateToBatchComponent;
  let fixture: ComponentFixture<AddAssociateToBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociateToBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

