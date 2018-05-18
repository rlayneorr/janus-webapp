import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http/';
import { environment } from '../../../../../environments/environment';
import { HydraTrainee } from '../../../../gambit-client/entities/HydraTrainee';
import { forEach } from '@angular/router/src/utils/collection';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';

/**
 * Service for retrieving and updating data relating to associates.
 * @author Alex, Xavier
 */
@Injectable()
export class AssociateService {

    private associatePath = '8091';

    status: string;
    client: string;

    constructor(private http: HttpClient, private urlService: UrlService) { }

    /** Get specific associate by id
     * @param id - the id of the associate to retrieve
     */
    getAssociate(id: number): Observable<any> {
        return this.http.get(this.urlService.trainees.findById(id));
    }
    /**
     * Get all of the associates
     */
    getAllAssociates(): Observable<any> {
        return this.http.get(this.urlService.trainees.findAll());
    }

    /**
     * @function getAssociatesByStatus
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByStatus(statusId: number) {
        console.log('Inside Associate Service - getFilteredAssociates');
        console.log('statusId: ' + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/marketingStatus/' + statusId);
    }

    /**
    * @function getAssociatesByClient
    * @description Make an http request to the /client webservice, fetching mapped associates
    * with the given marketing status.
    * @param statusId Contains the marketing status id used to fetch data
    */
    getAssociatesByClient(statusId: number) {
        console.log('Inside Associate Service - getFilteredAssociates');
        console.log('statusId: ' + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/client/' + statusId);
    }

    /**
     * @function getAssociatesByEndClient
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByEndClient(statusId: number) {
        console.log('Inside Associate Service - getFilteredAssociates');
        console.log('statusId: ' + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/endClient/' + statusId);
    }

    /**
     * @function getAssociatesByEndClient
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByBatch(statusId: number) {
        console.log('Inside Associate Service - getFilteredAssociates');
        console.log('statusId: ' + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/batch/' + statusId);
    }

    /**
     * Update the given associate's status/client
     * @param ids of associates to be updated
     */
    updateAssociate(trainee: HydraTrainee): Observable<any> {
        return this.http.put(this.urlService.trainees.update(), trainee);
    }

    getInterviewsForAssociate(id: number): Observable<any> {
        const url: string = environment.url + this.associatePath + '/' + id + '/interviews/';
        return this.http.get(url);
    }

    addInterviewForAssociate(id: number, interview: any): Observable<any> {
        const url: string = environment.url + this.associatePath + '/' + id + '/interviews/';
        return this.http.post(url, interview);
    }
}
