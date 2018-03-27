import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

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
    public skillTypeBuckets: SkillTypeBucket[] = [];

    //url: string = "/skillType/";
    url: string = "https://hydra-gateway-service.cfapps.io/skilltype-service/skillType/";

    //Buckets will probably be an array of buckets after model/entity is created
    createSkillType(name: string, skillTypeBuckets: SkillTypeBucket[]) {
        return this.http.post(this.url + "createSkillType", { name: name, skillTypeBuckets: skillTypeBuckets }, httpOptions);
    }

    deactivateSkillType(skillTypeId: number) {
        return this.http.put(this.url + "deactivateSkillType", skillTypeId, httpOptions);
    }

    activateSkillType(skillTypeId: number) {
        return this.http.put(this.url + "activateSkillType", skillTypeId, httpOptions);
    }

    getSkillTypes() {
        return this.http.get(this.url + "getSkillTypes");
    }

    updateSkillType(skillTypeBuckets: SkillTypeBucket[]) {
        return this.http.put(this.url + "updateSkillType", { skillTypeBuckets: skillTypeBuckets }, httpOptions);
    }

    getSkillTypeById(skillTypeId: number) {
        return this.http.get(this.url + "getSkillType/" + skillTypeId);
    }

    /** Temporary solution for this func, need to double check with back-end **/
    getBucketsBySkillType(skillTypeId: number): Observable<Bucket[]> {
        return this.http.get<Bucket[]>(this.url + "getTopics/" + skillTypeId);
    }

    testingGetTags() {
        return this.http.get(this.url + "getAllTags");
    }

    testingCreatingTags(thing:any) {
        this.http.post(this.url + "createNewTag", thing).subscribe();
    }

}
