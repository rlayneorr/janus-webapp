import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { SkillType } from '../entities/SkillType';
import { Category } from '../entities/Category';
import { Bucket } from '../entities/Bucket';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
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
        return this.http.put(this.urlService.category.putCategory(category.categoryId), category, httpOptions);
    }

    getCategories() {
        return this.http.get<any[]>(this.urlService.category.getCategories());
    }

    getCategoryById(categoryId: number) {
        return this.http.get(this.urlService.category.getCategoryById(categoryId));
    }
    // setSkillTypeBuckets(skillType: SkillType, bucketIds, weights) {
    //     return this.http.post(this.urlService.skillTypes.setSkillTypeBuckets(), { skillTypeName: skillType.skillTypeName, skillTypeId:
    //         skillType.skillTypeId, bucketIds: bucketIds, weights: weights }, httpOptions);
    // }

    // updateSkillTypeBuckets(skillType: SkillType, bucketIds, weights) {
    //     return this.http.put(this.urlService.skillTypes.updateSkillTypeBuckets(), { skillTypeName: skillType.skillTypeName,
    //         skillTypeId: skillType.skillTypeId, bucketIds: bucketIds, weights: weights }, httpOptions);
    // }
}
