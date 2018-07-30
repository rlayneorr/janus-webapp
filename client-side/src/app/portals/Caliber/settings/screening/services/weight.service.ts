import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SkillType } from '../entities/SkillType';
import { Category } from '../entities/Category';
import { UrlService } from '../../../../../caliber-client/services/urls/url.service';
import { Subject } from 'rxjs';
import { CategoryWeight } from '../entities/Category-Weight';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable()
export class CategoryWeightsService {

/** Making an Observable */
categoryWeightSubject = new Subject();
routingToAllCategoryWeights = false;

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { }
    public weights: Observable<CategoryWeight[]>;

    createWeight(weight: CategoryWeight) {
        return this.http.post<CategoryWeight>(this.urlService.weight.createWeight(), weight, httpOptions);
    }

    getWeights() {
        return this.http.get<CategoryWeight[]>(this.urlService.weight.getWeights(), httpOptions);
    }

    getWeightByIds(skillTypeId: number, categoryId: number) {
        return this.http.get<CategoryWeight>(this.urlService.weight.getWeightByIds(skillTypeId, categoryId), httpOptions);
    }

    updateWeight(skillType: SkillType, category: Category, weight: CategoryWeight) {
        return this.http.put(this.urlService.weight.updateWeight(skillType.skillTypeId, category.categoryId), weight, httpOptions);
    }

    deleteWeight(skillType: SkillType, category: Category){
        console.log("delete")
        console.log(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId))
        return this.http.delete(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId), httpOptions);
    }
}
