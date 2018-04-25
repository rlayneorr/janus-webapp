import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// services
import { AlertsService } from './alerts.service';
import { environment } from '../../../../environments/environment';

// entities
import { Category } from '../entities/Category';
import { CRUD } from '../interfaces/api.interface';

/**
* this service manages calls to the web services
* for Category objects
*/
@Injectable()
export class CategoryService implements CRUD<Category> {

  public listSubject = new BehaviorSubject<Category[]>([]);

  constructor(public httpClient: HttpClient, public alertService: AlertsService) {
    this.listSubject = new BehaviorSubject([]);
  }

 /*
   =====================
   BEGIN: API calls
   =====================
 */

/**
 * retrieves all categories
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 */
 public fetchAll(): Observable<Category[]> {
   this.httpClient.get<Category[]>(environment.category.fetchAll()).subscribe(res => this.listSubject.next(res));
   return this.listSubject.asObservable();
 }

 /**
 * retrieves all ACTIVE categories
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 */
 public fetchAllActive(): Observable<Category[]> {
   const url = environment.category.fetchAllActive();
   this.httpClient.get<Category[]>(url)
   .subscribe((results) => this.listSubject.next(results));
   return this.listSubject.asObservable();
 }

 /**
 * retrieves a category by its ID
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 * @param id: number
 *
 * @return Observable<Category>
 */
 public fetchById(id: number): Observable<Category> {
   const url = environment.category.fetchById(id);
   return this.httpClient.get<Category>(url);
 }

  /**
  * transmits a new Category to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param category: Category
  */
  public create(category: Category): Observable<Category> {
    const url = environment.category.save();
    return this.httpClient.post<Category>(url, JSON.stringify(category));
  }

  /**
   * transmits a Category to be updated.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param category: Category
   */
  public update(category: Category): Observable<Category> {
    const url = environment.category.update();
    return this.httpClient.put<Category>(url, JSON.stringify(category));
  }

  public delete(category: Category): Observable<Category> {
    return Observable.of(category);
  }
}
