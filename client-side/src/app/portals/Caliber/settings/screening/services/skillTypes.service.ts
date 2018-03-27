import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { SkillType } from '../entities/SkillType';
import { SkillTypeBucket } from '../entities/SkillTypeBucket';
import { Bucket } from '../entities/Bucket';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable()
export class SkillTypesService {

    constructor(private http: HttpClient) { }
    public skillTypeBuckets: Observable<SkillType[]>
    url: string = "https://hydra-gateway-service.cfapps.io/skilltype-service/skillType/";

    createSkillType(skillType: SkillType) {
        console.log(skillType);
        return this.http.post(this.url + "createSkillType", skillType, httpOptions);
    }

    deactivateSkillType(skillTypeId: number) {
        return this.http.put(this.url + "deactivateSkillType/" + skillTypeId, httpOptions);
    }

    activateSkillType(skillTypeId: number) {
        return this.http.put(this.url + "activateSkillType", skillTypeId, httpOptions);
    }

    getSkillTypes():Observable<SkillType[]> {
        return this.http.get(this.url + "getSkillTypes");
    }

    updateSkillType(skillType: SkillType, bucketIds, weights) {
        return this.http.post(this.url + "updateSkillType", { skillTypeName: skillType.skillTypeName, skillTypeId: skillType.skillTypeId, bucketIds: bucketIds, weights: weights }, httpOptions);
    }

    getSkillTypeById(skillTypeId: number) {
        return this.http.get(this.url + "getSkillType/" + skillTypeId);
    }

    /** Temporary solution for this func, need to double check with back-end **/
    getBucketsBySkillType(skillTypeId: number): Observable<SkillType[]> {
        return this.http.get<SkillType[]>(this.url + "getSkillTypeBucketsWithWeights/" + skillTypeId);
    }

    testingGetTags() {
        return this.http.get(this.url + "getAllTags");
    }

    testingCreatingTags(thing:any) {
        this.http.post(this.url + "createNewTag", thing).subscribe();
    }

}
