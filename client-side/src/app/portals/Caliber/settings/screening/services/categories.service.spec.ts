import { TestBed, inject } from '@angular/core/testing';
import { SettingsCategoriesService } from "../services/categories.service";
import { HttpClientModule } from '@angular/common/http';
import { AlertsService } from '../../../services/alerts.service';
import { Category } from '../entities/Category';
import { CategoryWeight } from '../entities/Category-Weight';
import { Bucket } from '../entities/Bucket';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

// Jakob LaSorella | 1805-WVU-MAY29 | Richard Orr

fdescribe('CategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SettingsCategoriesService, UrlService, AlertsService]
    });
  });

  /**
   * Test if all categories are retrieved.
   *
   * Function Tested: getCategories()
   **/

  it('should get all categories', inject([SettingsCategoriesService], (service: SettingsCategoriesService) => {
    service.getCategories();
    expect(service).toBeTruthy();
  }));

  /**
   * Test if a new category is added.
   *
   * Function Tested: createCategory()
   **/

  it('should create new category', inject([SettingsCategoriesService], (service: SettingsCategoriesService) => {
    var cat = new Category();
    cat.categoryId = 1;
    cat.title = "createCategoryTest";
    var weight = new CategoryWeight();
    weight.weight = 3;
    cat.categoryWeight = weight;
    var bucket = [new Bucket()];
    cat.buckets = bucket;
    var start = service.getCategories();
    service.createCategory(cat);
    var end = service.getCategories();
    expect(start).not.toEqual(end);
  }));

  /**
  * Test if a category is updated.
  *
  * Function Tested: updateCategory()
  **/

  it('should update category', inject([SettingsCategoriesService], (service: SettingsCategoriesService) => {
    var cat = new Category();
    cat.categoryId = 4;
    cat.title = "updateCategoryTest";
    var weight = new CategoryWeight();
    weight.weight = 12;
    cat.categoryWeight = weight;
    var bucket = [new Bucket()];
    cat.buckets = bucket;
    var start = service.getCategoryById(4);
    service.updateCategory(cat);
    var end = service.getCategoryById(4);
    expect(start).not.toEqual(end);
  }));

  /**
  * Test if a category is deleted.
  *
  * Function Tested: deleteCategory()
  **/

  it('should delete category', inject([SettingsCategoriesService], (service: SettingsCategoriesService) => {
    var start = service.getCategoryById(4);
    service.deleteCategory(4);
    var end = service.getCategoryById(4);
    expect(start).not.toEqual(end);
  }));
});
