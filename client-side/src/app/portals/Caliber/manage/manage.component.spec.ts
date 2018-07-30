import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// services

import {ManageComponent} from './manage.component';
// import * as Dep from './manage.component';
import {Dependencies} from '../caliber.test.module';

xdescribe('ManageComponent', () => {

// xdescribe('ManageComponent', () => {

  let component: ManageComponent;
  let fixture: ComponentFixture<ManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
