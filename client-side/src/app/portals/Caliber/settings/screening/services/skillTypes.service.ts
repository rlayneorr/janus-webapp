import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SkillType } from '../entities/SkillType';
import { Bucket } from '../entities/Bucket';
import { UrlService } from '../../../../../gambit-client/services/urls/url.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};

@Injectable()
export class SkillTypesService {

    constructor(
        private http: HttpClient,
        private urlService: UrlService
    ) { }
    public skillTypes: Observable<SkillType[]>;

    createSkillType(skillType: SkillType) {
        return this.http.post(this.urlService.skillTypes.createSkillType(), skillType, httpOptions);
    }

    /*activateSkillType(skillType: SkillType) {
        return this.http.put(this.urlService.skillTypes.updateSkillType(skillType.skillTypeId), skillType, httpOptions);
    }

    deactivateSkillType(skillType: SkillType) {
        return this.http.put(this.urlService.skillTypes.updateSkillType(skillType.skillTypeId), skillType, httpOptions);
    }

    setSkillTypeBuckets(skillType: SkillType, bucketIds, weights) {
        return this.http.post(this.urlService.skillTypes.setSkillTypeBuckets(), { skillTypeName: skillType.title, skillTypeId:
            skillType.skillTypeId, bucketIds: bucketIds, weights: weights }, httpOptions);
    }

    updateSkillTypeBuckets(skillType: SkillType, bucketIds, weights) {
        return this.http.put(this.urlService.skillTypes.updateSkillTypeBuckets(), { skillTypeName: skillType.title,
            skillTypeId: skillType.skillTypeId, bucketIds: bucketIds, weights: weights }, httpOptions);
    }*/

    getSkillTypeById(skillTypeId: number) {
        return this.http.get<SkillType>(this.urlService.skillTypes.getSkillTypeById(skillTypeId));
    }


    getSkillTypes() {
        return this.http.get<SkillType[]>(this.urlService.skillTypes.getSkillTypes());
    }

    updateSkillType(skillType: SkillType) {
        return this.http.put<SkillType>(this.urlService.skillTypes.updateSkillType(skillType.skillTypeId), skillType, httpOptions);
    }

    deleteSkillType(skillTypeId: number) {
        return this.http.delete(this.urlService.skillTypes.deleteSkillType(skillTypeId));
    }

    /** Temporary solution for this func, need to double check with back-end **/
    getSkillTypeCategories(skillTypeId: number, categoryId: number) {
        return this.http.get<Bucket[]>(this.urlService.skillTypes.getBucketBySkillType(skillTypeId, categoryId));
    }
}
