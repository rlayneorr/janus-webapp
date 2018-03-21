import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSearchComponent } from './topic-search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';

describe('TopicSearchComponent', () => {
  let component: TopicSearchComponent;
  let fixture: ComponentFixture<TopicSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
