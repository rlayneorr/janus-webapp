import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPoolComponent } from './topic-pool.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('TopicPoolComponent', () => {
  let component: TopicPoolComponent;
  let fixture: ComponentFixture<TopicPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
