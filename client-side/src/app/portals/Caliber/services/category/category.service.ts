import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// rxjs
import {Observable} from 'rxjs/Observable';
// services
import {AlertsService} from '../alerts.service';
import {UrlService} from '../../../../caliber-client/services/urls/url.service';
// entities
import {Category} from '../../entities/Category';
import {CRUD} from '../../interfaces/api.interface';

/**
 * this service manages calls to the web services
 * for Category objects
 */
@Injectable()
export class CategoryService implements CRUD<Category> {

  // public listSubject = new BehaviorSubject<Category[]>([]);
  private urlService = new UrlService();
  constructor(public httpClient: HttpClient, public alertService: AlertsService) {
    // this.listSubject = new BehaviorSubject([]);
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
//  public fetchAll(): Observable<Category[]> {
//    this.httpClient.get<Category[]>(this.urlService.category.fetchAll()).subscribe(res => this.listSubject.next(res));
//    console.log(this.listSubject);
//    for(let item of this.listSubject)
//    {
//       console.log(item);
//    }
//    return this.listSubject.asObservable();
//  }

public fetchAll(): Observable<Category[]> {
  const url = this.urlService.category.fetchAll();
  return this.httpClient.get<Category[]>(url);
}

// Removed this method because a Category no longer has an active attribute. *Tyerra Smith*
 /**
 * retrieves all ACTIVE categories
 *
 * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING','PANEL')")
 *
 */
//  public fetchAllActive(): Observable<Category[]> {
//    const url = this.urlService.category.fetchAllActive();
//    this.httpClient.get<Category[]>(url)
//    .subscribe((results) => this.listSubject.next(results));
//    return this.listSubject.asObservable();
//  }

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
   const url = this.urlService.category.fetchById(id);
   return this.httpClient.get<Category>(url);
 }

  /**
  * Transmits a new Category to be created.
  *
  * spring-security: @PreAuthorize("hasAnyRole('VP')")
  *
  * @param category: Category
  */
  // public create(category: Category): Observable<Category> {
  //   const url = this.urlService.category.save();
  //   return this.httpClient.post<Category>(url, JSON.stringify(category));
  // }

  public create(category: Category): Observable<Category> {
      const url = this.urlService.category.createCategory();
      return this.httpClient.post<Category>(url, JSON.stringify(category));
    }


  /**
   * Transmits a Category to be updated.
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param category: Category
   */
  public update(category: Category): Observable<Category> {
    const url = this.urlService.category.updateCategory(category.categoryId);
    return this.httpClient.put<Category>(url, JSON.stringify(category));
  }

  // public delete(category: Category): Observable<Category> {
  //   return Observable.of(category);
  // }

  public delete(category: Category) {
    console.log("We made it to the SERVICE!");
    console.log(category);
    const url = this.urlService.category.deleteCategory(category.categoryId);
    return this.httpClient.delete<Category>(url);
  }
}
