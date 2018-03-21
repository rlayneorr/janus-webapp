import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAssociatesComponent } from './view-associates.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';

describe('ViewAssociatesComponent', () => {
  let component: ViewAssociatesComponent;
  let fixture: ComponentFixture<ViewAssociatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
