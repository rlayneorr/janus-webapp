import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AlertsService } from '../../services/alerts.service';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../../Caliber/entities/Category';
import { CATEGORIES, replacementCategory} from './mock-categories';
import { defer } from 'rxjs/observable/defer';
import { CategoriesService } from '../categories.service';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

///////////////////////////////////////////////////////////////////////
// tests the category service with mock data

// note - as of 5/9/2018, category service's methods return objects,
// instead of categories. These tests will continue to fail until this issue
// is resolved.
describe('CategoryService', () => {
  let httpClientSpyOnGet: { get: jasmine.Spy };
  let httpClientSpyOnPost: { post: jasmine.Spy };
  let httpClientSpyOnPut: {put: jasmine.Spy };
  let httpClientSpyOnDelete: { delete: jasmine.Spy };
  let categoryService: CategoryService;
  const alertsService: AlertsService = new AlertsService();

  it('fetchAll() should make Http get request, and return the categories that it fetched', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    categoryService = new CategoryService(<any> httpClientSpyOnGet, alertsService);

    const expected: Category[] = CATEGORIES;

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

    categoryService.fetchAll().subscribe(
      categories => expect(categories).toEqual(expected, 'expected categories'),
      fail
    );
    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('fetchAllActive() should make Http get request, and return the category that it fetched', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    categoryService = new CategoryService(<any> httpClientSpyOnGet, alertsService);

    const expected: Category[] = [CATEGORIES[0], CATEGORIES[3]];

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

    categoryService.fetchAllActive().subscribe(
      categories => expect(categories).toEqual(expected, 'expected categories'),
      fail
    );
    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('fetchById() should make Http get request, and return the category that it fetched', () => {
    httpClientSpyOnGet = jasmine.createSpyObj('http', ['get']);
    categoryService = new CategoryService(<any> httpClientSpyOnGet, alertsService);

    const expected: Category = CATEGORIES[0];

    httpClientSpyOnGet.get.and.returnValue(asyncData(expected));

    categoryService.fetchById(0).subscribe(
      categories => expect(categories).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnGet.get.calls.count()).toBe(1, 'one call');
  });

  it('create() should make Http post request, and return the category that it created', () => {
    httpClientSpyOnPost = jasmine.createSpyObj('http', ['post']);
    categoryService = new CategoryService(<any> httpClientSpyOnPost, alertsService);

    const expected: Category = CATEGORIES[4];

    httpClientSpyOnPost.post.and.returnValue(asyncData(expected));

    categoryService.create(CATEGORIES[4]).subscribe(
      categories => expect(categories).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnPost.post.calls.count()).toBe(1, 'one call');
  });

  it('update() should make Http put request, and return the category that it altered', () => {
    httpClientSpyOnPut = jasmine.createSpyObj('http', ['put']);
    categoryService = new CategoryService(<any> httpClientSpyOnPut, alertsService);

    const expected: Category = CATEGORIES[4];

    httpClientSpyOnPut.put.and.returnValue(asyncData(expected));

    categoryService.update(CATEGORIES[4]).subscribe(
      categories => expect(categories).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnPut.put.calls.count()).toBe(1, 'one call');
  });

  it('delete() should make Http delete request, and return the category that it deleted', () => {
    httpClientSpyOnDelete = jasmine.createSpyObj('http', ['delete']);
    categoryService = new CategoryService(<any> httpClientSpyOnDelete, alertsService);

    const expected: Category = CATEGORIES[4];

    httpClientSpyOnDelete.delete.and.returnValue(asyncData(expected));

    categoryService.delete(CATEGORIES[4]).subscribe(
      categories => expect(categories).toEqual(expected, 'expected category'),
      fail
    );
    expect(httpClientSpyOnDelete.delete.calls.count()).toBe(1, 'one call');
  });
});
