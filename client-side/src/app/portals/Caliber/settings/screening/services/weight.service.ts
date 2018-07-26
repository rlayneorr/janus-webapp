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
        return this.http.post(this.urlService.weight.createWeight(), weight, httpOptions);
    }

    getWeights() {
        return this.http.get<any[]>(this.urlService.weight.getWeights());
    }

    getWeightByIds(skillTypeId: number, categoryId: number) {
        return this.http.get<any>(this.urlService.weight.getWeightByIds(skillTypeId, categoryId));
    }

    updateWeight(weight: CategoryWeight) {
        return this.http.put(this.urlService.weight.updateWeight(weight.weightId), weight, httpOptions);
    }

    deleteWeight(weight: CategoryWeight){
        console.log(weight)
        return this.http.delete(this.urlService.weight.deleteWeight(weight.weightId), httpOptions);
    }
}
