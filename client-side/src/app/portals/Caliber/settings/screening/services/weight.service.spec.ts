import { TestBed, inject } from '@angular/core/testing';
import { CategoryWeightsService } from './weight.service';
import {HttpClientModule, HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {UrlService} from "../../../../../gambit-client/services/urls/url.service";
import { CategoryWeight } from '../entities/Category-Weight';
import { SkillType } from '../entities/SkillType';
import { Category } from '../entities/Category';

fdescribe('CategoryWeightsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CategoryWeightsService, HttpClient, HttpHandler, UrlService]
      
    });
  });

  it('should be created', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
    expect(service).toBeTruthy();
  }));
     /**
   * Test if a new categoryWeight is added.
   *
   * Function Tested: createCategoryWeight()
   **/

  it('should create new categoryWeight', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
    var weight = new CategoryWeight();
    weight.weight = 3;
    weight.weightId = 1;
    var cat = new Category();
    cat.categoryId = 4;
    var skill = new SkillType();
    skill.skillTypeId = 2;
    var start = service.getWeights();
    service.createWeight(weight);
    var end = service.getWeights();
    expect(start).not.toEqual(end);
  }));
/**
  * Test if a categoryWeight is updated.
  *
  * Function Tested: updateCategoryWeight()
  **/

 it('should update categoryWeight', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
    var weight = new CategoryWeight();
    weight.weight = 3;
    weight.weightId = 1;
    var cat = new Category();
    cat.categoryId = 5;
    var skill = new SkillType();
    skill.skillTypeId = 2;
  var start = service.getWeightByIds(2,5);
  service. updateWeight(skill,cat,weight);
  var end = service.getWeightByIds(2,5);
  expect(start).not.toEqual(end);
}));
/**
  * Test if a categoryWeight is deleted.
  *
  * Function Tested: deleteCategoryWeight()
  **/

 it('should delete categoryWeight', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
  var weight = new CategoryWeight();
  weight.weight = 3;
  weight.weightId = 1;
  var cat = new Category();
  cat.categoryId = 5;
  var skill = new SkillType();
  skill.skillTypeId = 2;
  var start = service.getWeightByIds(2,5);
  service.deleteWeight(skill,cat);
  var end = service.getWeightByIds(2,5);
  expect(start).not.toEqual(end);
}));
/**
  * Test to get categoryWeight by id.
  *
  * Function Tested: getWeightByIds()
  **/

 it('should get categoryWeight by id', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
  var cat = new Category();
  cat.categoryId = 5;
  var skill = new SkillType();
  skill.skillTypeId = 2;
  var start = service.getWeightByIds(2,5);
  service.getWeightByIds(2,5);
  var end = service.getWeightByIds(2,5);
  expect(start).not.toEqual(end);
}));
/**
  * Test to get categoryWeight.
  *
  * Function Tested: getWeights()
  **/
it('should get categoryWeight', inject([CategoryWeightsService], (service: CategoryWeightsService) => {
  var start = service.getWeights();
  service.getWeights();
  var end = service.getWeights();
  expect(start).not.toEqual(end);
}));
});
