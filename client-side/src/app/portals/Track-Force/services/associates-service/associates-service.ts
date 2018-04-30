import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Associate } from '../../models/associate.model';
import { Response } from '@angular/http/';
import { environment } from '../../../../../environments/environment';
import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';

/**
 * Service for retrieving and updating data relating to associates.
 * @author Alex, Xavier
 */
@Injectable()
export class AssociateService {

    status: string;
    client: string;

    constructor(private http: HttpClient) {}

    /**
     * Get all of the associates
     */
    getAllAssociates(): Observable<any> {
        return this.http.get(environment.context + '/trainees');
    }

    getAssociate(id: number): Observable<any> {
        return this.http.get(environment.context + '/trainees/' + id);
    }

    /**
     * Update the given associates statuses/clients
     * @param ids of associates to be updated
     */
    updateAssociate(trainee: HydraTrainee): Observable<any> {
        return this.http.put(environment.context + '/trainees', trainee);
    }
}
