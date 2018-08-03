import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SkillType} from '../settings/screening/entities/SkillType';
import {Category} from '../settings/screening/entities/Category';
import {UrlService} from '../../../caliber-client/services/urls/url.service';
import {Subject} from 'rxjs';
import {CategoryWeight} from '../settings/screening/entities/Category-Weight';

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

    // deleteWeight(skillType: SkillType, category: Category) {
    //   console.log("delete");
    //   console.log(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId));
    //   return this.http.delete(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId), httpOptions);
    // }

    deleteWeight(weight: CategoryWeight){
        console.log("delete");
        console.log(this.urlService.weight.deleteWeight(weight.skillTypeId, weight.categoryId));
        return this.http.delete(this.urlService.weight.deleteWeight(weight.skillTypeId, weight.categoryId), httpOptions);
    }
}
