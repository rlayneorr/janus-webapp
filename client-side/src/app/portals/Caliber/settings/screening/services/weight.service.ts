import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SkillType } from '../entities/SkillType';
import { Category } from '../entities/Category';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
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

    deleteWeight(skillType: SkillType, category: Category, weight: CategoryWeight){
        console.log("delete")
<<<<<<< HEAD
        console.log(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId))
        console.log(weight)
        return this.http.delete(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId), httpOptions);
=======
        console.log(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId, weight.weightId))
        console.log(weight)
        return this.http.delete(this.urlService.weight.deleteWeight(skillType.skillTypeId, category.categoryId, weight.weightId), httpOptions);
>>>>>>> 488d30cc627311c37396da7868a275b94bfd3a09
    }
}
