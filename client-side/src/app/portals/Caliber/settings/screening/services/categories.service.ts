import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { SkillType } from '../entities/SkillType';
import { Category } from '../entities/Category';
import { Bucket } from '../entities/Bucket';
import { UrlService } from '../../../../../caliber-client/services/urls/url.service';
import { Subject } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable()
export class SettingsCategoriesService {

/** Making an Observable */
categorySubject = new Subject();
routingToAllCategories = false;

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { }
    public categories: Observable<Category[]>;

    createCategory(category: Category) {
        return this.http.post(this.urlService.category.createCategory(), category, httpOptions);
    }

    updateCategory(category: Category) {
      console.log(category);
        return this.http.put(this.urlService.category.updateCategory(category.categoryId), category, httpOptions);
    }

    getCategories() {
        return this.http.get<Category[]>(this.urlService.category.getCategories());
    }

    getCategoryById(categoryId: number) {
        return this.http.get<Category>(this.urlService.category.getCategoryById(categoryId));
    }

    deleteCategory(categoryId: number) {
        return this.http.delete(this.urlService.category.deleteCategory(categoryId), httpOptions);
    }
}
