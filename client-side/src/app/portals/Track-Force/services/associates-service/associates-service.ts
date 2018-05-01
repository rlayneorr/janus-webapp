import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Associate } from '../../models/associate.model';
import { Response } from '@angular/http/';
import { environment } from '../../../../../environments/environment';
import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';
import 'rxjs/add/operator/map'
import { forEach } from "@angular/router/src/utils/collection";

/**
 * Service for retrieving and updating data relating to associates.
 * @author Alex, Xavier
 */
@Injectable()
export class AssociateService {

    private associatePath: string = "8091";

    status: string;
    client: string;

    constructor(private http: HttpClient) { }

    /** Get specific associate by id
     * @param id - the id of the associate to retrieve
     */
    getAssociate(id: number): Observable<any> {
        return this.http.get(environment.context + '/trainees/' + id);
    }
    /**
     * Get all of the associates
     */
    getAllAssociates(): Observable<any> {
        return this.http.get(environment.context + '/trainees');
    }

    /**
     * @function getAssociatesByStatus
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByStatus(statusId: number) {
        console.log("Inside Associate Service - getFilteredAssociates");
        console.log("statusId: " + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/marketingStatus/' + statusId);
    }

    /**
    * @function getAssociatesByClient
    * @description Make an http request to the /client webservice, fetching mapped associates
    * with the given marketing status.
    * @param statusId Contains the marketing status id used to fetch data
    */
    getAssociatesByClient(statusId: number) {
        console.log("Inside Associate Service - getFilteredAssociates");
        console.log("statusId: " + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/client/' + statusId);
    }

    /**
     * @function getAssociatesByEndClient
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByEndClient(statusId: number) {
        console.log("Inside Associate Service - getFilteredAssociates");
        console.log("statusId: " + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/endClient/' + statusId);
    }

    /**
     * @function getAssociatesByEndClient
     * @description Make an http request to the /client webservice, fetching mapped associates
     * with the given marketing status.
     * @param statusId Contains the marketing status id used to fetch data
     */
    getAssociatesByBatch(statusId: number) {
        console.log("Inside Associate Service - getFilteredAssociates");
        console.log("statusId: " + statusId);
        return this.http.get(environment.url + this.associatePath + '/all/associate/batch/' + statusId);
    }

    /**
     * Update the given associate's status/client
     * @param ids of associates to be updated
     */
    updateAssociate(trainee: HydraTrainee): Observable<any> {
        return this.http.put(environment.context + '/trainees', trainee);
    }

    getInterviewsForAssociate(id: number): Observable<any> {
        let url: string = environment.url + this.associatePath + "/" + id + "/interviews/";
        return this.http.get(url);
    }

    addInterviewForAssociate(id: number, interview: any): Observable<any> {
        let url: string = environment.url + this.associatePath + "/" + id + "/interviews/";
        return this.http.post(url, interview);
    }
}