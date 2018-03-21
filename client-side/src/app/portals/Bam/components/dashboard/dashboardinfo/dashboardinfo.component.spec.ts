import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoComponent } from './dashboardinfo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('DashboardInfoComponent', () => {
  let component: DashboardInfoComponent;
  let fixture: ComponentFixture<DashboardInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
