import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../environments/environment';

// entities
import { Category } from '../entities/Category';
import { AlertsService } from './alerts.service';

/**
 * this service is used to manage API calls
 * for the category objects
 */
@Injectable()
export class CategoriesService {

  private dataSubject = new BehaviorSubject([]);
  public newCategory: Category = new Category();

  categories$: Observable<any> = this.dataSubject.asObservable(); // this is how components should access the data if you want to cache it

  constructor(private http: HttpClient, private alertService: AlertsService) {
    this.fetchAll();
   }

  /**
   * retrieves a list of all categories and pushes them to the
   * data subject
   *
   */
  public fetchAll(): void {
    this.http.get<Category[]>(environment.getAllCategories).subscribe( (resp) => {
      this.dataSubject.next(resp);
      this.alertService.success('Got all Categories successfully');
    });
  }

  /**
   * Creates a new category and pushes it on the same
   * data subject
   *
   * @param newCategory
   */
  public addNewCategory(newCategory: Category): void {
    const data = JSON.stringify(newCategory);
    this.http.post<Category>(environment.addNewCategory, data).subscribe( (resp) => {
      this.alertService.success('Added a new Category');
      this.fetchAll();
    },
    (err) => {
      this.alertService.error('Failed to add new Category');
    });
  }

  /**
   * edits a the currently selected category and
   * updates the category in the database
   *
   * @param currentCategory
   */
  public editCurrentCategory(currentCategory: Category): void {
    const data = JSON.stringify(currentCategory);
    this.http.put(environment.editCurrentCategory, data).subscribe( (resp) => {
      this.alertService.success('Successfully edited ' + currentCategory.skillCategory);
     },
    (err) => {
      this.alertService.error('Failed to edit ' + currentCategory.skillCategory);
    });
  }
}
