import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { SkillTypesService } from './skillTypes.service';
import { SkillTypesComponent } from '../skillTypes/skillTypes.component';

//mock data
import { SKILLTYPES } from '../mock-data/mock-skillTypes';

fdescribe('SkillTypesService', () => {

  let component: SkillTypesComponent;
  let fixture: ComponentFixture<SkillTypesComponent>;
  //let skillTypeService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillTypesComponent],
      providers: [SkillTypesService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTypesComponent);
    component = fixture.componentInstance;
    //skillTypeService = fixture.debugElement.injector.get(SkillTypesService);
    fixture.detectChanges();
  });

  //create skill type

  it('should be created', inject([SkillTypesService], (service: SkillTypesService) => {
    // let fixture = TestBed.createComponent(SkillTypesComponent);
    // let component = fixture.componentInstance;
    // let service = fixture.debugElement.injector.get(SkillTypesService);
    //fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  //activate skill type

  it('should be activated', inject([SkillTypesService], (service: SkillTypesService) => {
    // let fixture = TestBed.createComponent(SkillTypesComponent);
    // let component = fixture.componentInstance;
    component.skillType = SKILLTYPES[0];
    service.activateSkillType(component.skillType);
    // fixture.detectChanges();
    expect(component.skillType.isActive).toBe(true);
  }));

  //deactivate skill type



  //update skill type

  //get skill types

  //set skill type buckets

  //update skill type buckets

  //get skill type by id

  //delete skill type

  //get skill type categories
});
