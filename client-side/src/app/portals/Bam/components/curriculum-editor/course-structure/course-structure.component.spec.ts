import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseStructureComponent } from './course-structure.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { CurriculumService } from '../../../services/curriculum.service';
import { Observable } from 'rxjs/Observable';
import { Curriculum } from '../../../models/curriculum.model';
import { SubtopicService } from '../../../services/subtopic.service';
import { SubtopicCurric } from '../../../models/subtopicCurric.model';
import { Topic } from '../../../models/topic.model';
import { CurriculumSubtopic } from '../../../models/curriculumSubtopic.model';
import { SubtopicName } from '../../../models/subtopicname.model';
import { SubtopicType } from '../../../models/subtopictype.model';
import { TopicName } from '../../../models/topicname.model';
describe('CourseStructureComponent', () => {
  let component: CourseStructureComponent;
  let fixture: ComponentFixture<CourseStructureComponent>;
  let curTitle: string;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    const curriculumService: CurriculumService = TestBed.get(CurriculumService);
    const subtopicService: SubtopicService = TestBed.get(SubtopicService);
    spyOn(curriculumService, 'getSchedualeByCurriculumId')
    .and
    .returnValue(Observable.of(new CurriculumSubtopic
      (1, new SubtopicName
        (1, 'testName', new TopicName
        (1, 'topic') , new SubtopicType
        (1, 'type')), 1, 1)));

        const sub: SubtopicCurric = new SubtopicCurric();
        const topic: Topic = new Topic();
        topic.topicID = 1;
        topic.topicName = 'topic';
        sub.subtopicId = 1;
        sub.parentTopic = topic;
        sub.status = 'true';
        sub.subtopicName = 'testName';
        sub.date.day = 1;
        sub.date.endTime = 1;
        sub.date.startTime = 1;
        sub.date.week = 1;
    TestBed.overrideProvider(CurriculumService, {useValue: curriculumService});
    TestBed.overrideProvider(SubtopicService, {useValue: subtopicService});
    const subArr1: Array<SubtopicCurric> = new Array();
    subArr1.push(sub);
    // console.log('printing out the first one ');
    // console.log(subArr1);
    spyOn(subtopicService, 'getSubtopicByIDz')
    .and
    .callFake(function(){ return Observable.of(subArr1); });


    spyOn(curriculumService, 'changeData')
    .and
    .returnValue(new CurriculumSubtopic
      (1, new SubtopicName
        (1, 'testNameChanged', new TopicName
        (1, 'topic') , new SubtopicType
        (1, 'type')), 1, 1));
    fixture = TestBed.createComponent(CourseStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

it(
  'CourseStructureComponent should create curriculums', async() => {
   curTitle = 'curTest';
   component.createCurr(curTitle);
   component.messageEvent.subscribe(test => {
     expect(test.name).toBe('curTest');
   });
   fixture.debugElement.triggerEventHandler('messageEvent', <Event>{});
 });

 it(
   'should view the curriculum schedule', async() => {



   });

  fit(
    'should update', async() => {

  const subArr: Array<CurriculumSubtopic> = new Array();
  subArr.push(new CurriculumSubtopic
    (1, new SubtopicName
      (1, 'testName', new TopicName
      (1, 'topic') , new SubtopicType
      (1, 'type')), 1, 1));
  component.update(subArr);
  console.log(subArr);
  expect(subArr[0].curriculumSubtopicNameId.name).toBe('testNameChanged');


    });
});
