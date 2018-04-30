import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPoolComponent } from './topic-pool.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { Topic } from '../../../models/topic.model';

fdescribe('TopicPoolComponent', () => {
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

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set the topics array to contain the same values as the subTopicName array', () => {
    const Topics: Array<Topic> = [{topicID: 0, topicName: 'FirstTopic'},
      {topicID: 1, topicName: 'SecondTopic'}, {topicID: 2, topicName: 'ThirdTopic'}];

    component.subTopicName = Topics;
    component.initTopics();

    expect(component.topics).toEqual(['FirstTopic', 'SecondTopic', 'ThirdTopic']);
  });

});
