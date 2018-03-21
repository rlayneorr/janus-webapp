import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BamComponent } from './bam.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from './bam.test.module';

describe('BamComponent', () => {
  let component: BamComponent;
  let fixture: ComponentFixture<BamComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(BamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
