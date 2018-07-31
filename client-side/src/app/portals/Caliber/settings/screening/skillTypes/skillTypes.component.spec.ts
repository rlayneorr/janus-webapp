//Modules
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Dependencies } from '../../../caliber.test.module';

//Entities
import { SkillTypesComponent } from './skillTypes.component';
import { Bucket } from '../entities/Bucket';
import { SkillType } from '../entities/SkillType';

// Services
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
import { BucketsService } from '../services/buckets.service';
import { SkillTypesService } from '../services/skillTypes.service';
import { AlertsService } from '../../../services/alerts.service';

//Mock Data
// import { BUCKETS } from '../mock-data/mock-buckets';
//import { SKILLTYPES } from '../mock-data/mock-skillTypes';

//Observables
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('SkillTypesComponent', () => {
  let component: SkillTypesComponent;
  let fixture: ComponentFixture<SkillTypesComponent>;
  let bucketsService;
  let skillTypeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies)
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if the skillType gets edited or not.
   *
   * Function Tested: editSkillType(skillType)
   **/
  it('should edit a bucket', () => {
    // component.editSkillType(SKILLTYPES[0]);
    // expect(component.skillType).toEqual(SKILLTYPES[0]);
  });

  /**
   * Test if checkContains returns the id of the associated bucket for this skillType.
   *
   * Function Tested: checkContains(bucketId)
   */
  it('should check for a bucketId', () =>{
    //component.skillType = SKILLTYPES[0];
    //component.categoryIds = [1, 2, 3, 4, 5, 6, 7];
    //expect(component.checkContains(1)).toBe(true);
    //expect(component.checkContains(10)).toBe(false);
  });

  /**
   * Test if removeElement sets the skillType to inactive (if active)
   * or active (if inactive) and reorders the list.
   *
   * Function Tested: removeElement(item)
   */
  it('should toggle active/inactive and reorder list', ()=>{
    // component.allSkillTypes = SKILLTYPES;
    // //component.setSkillTypes();
    // let oldSkillTypes = component.skillTypes;
    // //let oldInactiveSkillTypes = component.inactiveSkillTypes;
    // let thing = SKILLTYPES[2];
    // //component.removeElement(thing.skillTypeId);
    // expect(thing.isActive).toBe(false);
    // expect(component.skillTypes).not.toEqual(oldSkillTypes);
    // //expect(component.inactiveSkillTypes).not.toEqual(oldInactiveSkillTypes);
  });

  /**
   * Test if an active and inactive skillType list are made.
   *
   * Function Tested: setSkillTypes()
   */
  it('should create an active and inactive list of skillTypes', () => {
    //component.allSkillTypes = SKILLTYPES;
    let oldSkillTypes = component.skillTypes;
    //let oldInactiveSkillTypes = component.inactiveSkillTypes;
    expect(component.skillTypes).not.toEqual(oldSkillTypes);
    //expect(component.inactiveSkillTypes).not.toEqual(oldInactiveSkillTypes);
  });

  /**
   * Tests that a modal opens when creating or editing a skillType
   *
   * Function Tested: open(content)
   */
  it('should open modal-content', () => {
    const content = document.querySelector('.modal-content');
    component.open(content);
    document.querySelector('.modal-content');
    expect(content).toBeDefined('defined');
  });

  /**
   * Tests whether a bucket gets added to a skillType
   *
   * Function Tested: addToCategories(bucket: Bucket)
   */
  it('should add a bucket to a skillType', () => {
    // component.allSkillTypes = SKILLTYPES;
    // component.skillType = SKILLTYPES[1];
    // //let bucket = BUCKETS[1];
    // //component.addToCategories(bucket);
    // expect(component.skillType).not.toEqual(SKILLTYPES[1]);
  });

  /**
   * Tests whether a bucket gets removed from a skillType
   *
   * Function Tested: removeFromCategories(bucket: Bucket)
   */
  it('should add a bucket to a skillType', () => {
    // component.allSkillTypes = SKILLTYPES;
    // component.skillType = SKILLTYPES[1];
    // //let bucket = BUCKETS[1];
    // //component.removeFromCategories(bucket);
    // expect(component.skillType).not.toEqual(SKILLTYPES[1]);
  });

  /**
   * Tests whether or not all skillTypes are grabbed
   *
   * Function Tested: grabAllSkillTypes()
   */
  it('should grab all skillTypes', async() => {
      const response: SkillType[] = [];
      spyOn(skillTypeService, 'getSkillTypes').and.returnValue(of(response));
      component.grabAllSkillTypes();
      fixture.detectChanges();
      expect(component.allSkillTypes.length).toBeGreaterThan(0);
  });

  /**
   * Tests whether or not all buckets are grabbed
   *
   * Function Tested: grabAllBuckets()
   */
  it('should grab all buckets', async() => {
    const response: Bucket[] = [];
    spyOn(bucketsService, 'getAllBuckets').and.returnValue(of(response));
    component.grabAllBuckets();
    fixture.detectChanges();
    expect(component.allBuckets.length).toBeGreaterThan(0);
    });

  /**
   * Tests whether or not a skillType's fields are reset.
   *
   * Function Tested: resetFields()
   */
  it('should reset fields', () => {
      //component.skillType = SKILLTYPES[0];
      component.error = true;
      //component.categoryIds = [0, 1, 2, 3, 4, 5, 6, 7];
      component.resetFields();
      expect(component.skillType).toBeFalsy;
      expect(component.error).toEqual(false);
      //expect(component.categoryIds.length).toEqual(0);
  });

  /**
   * Test if it displays Saved successfully.
   *
   * Function tested: savedSuccessfully();
   **/
  it('should save successfully',
  inject([AlertsService], (service: AlertsService) => {
    component.savedSuccessfully();
    let msg = '';
    let ty = '';
    service.getMessage().subscribe((s) => {
      ty = s.type;
      msg = s.text;
      expect(ty).toEqual('success');
      expect(msg).toEqual('Saved successfully');
    });
  }));
});
