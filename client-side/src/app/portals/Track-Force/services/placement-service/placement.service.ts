import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { Placement } from '../../models/placement.model';

/**
 * @author Nathaniel Blanchard
 * @description methods for grabbing data from api for Curriculum
 */

@Injectable()
export class PlacementService {
  private url: string = environment.msurl + '8093';

  constructor(private http: HttpClient) { }

  // get all interview placement
  getAllPlacements(): Observable<any> {
    return this.http.get(this.url + '/all/placement');
  }

  /** get an placement Object by id
    *@param {number} id
    */
  getOnePlacement(id: number): Observable<any> {
    return this.http.get(this.url + '/one/placement/' + id);
  }

  /** get an placement Object by associate id
    *@param {number} associateId
    */
  getAllPlacementsByAssociateId(associateId: number): Observable<any> {
    return this.http.get(this.url + '/all/placement/getByAssociateId/' + associateId);
  }

  createPlacement(placement: Placement): Observable<any> {
    return this.http.post(this.url + '/placement/create', {placement: placement});
  }

  /** update placement Object by object
    *@param {Placement} placement
    */
  updatePlacement(placement: Placement): Observable<any> {
    return this.http.put(this.url + '/placement/update', {placement: placement});
  }

  /** delete placement Object by id
    *@param {number} id
    */
  deletePlacement(id: number): Observable<any> {
    return this.http.delete(this.url + '/placement/delete/' + id);
  }

}
