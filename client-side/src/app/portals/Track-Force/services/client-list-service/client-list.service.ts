import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';

/**
 * @author Han Jung
 * @description methods for grabbing data from api for client list
 */

@Injectable()
export class ClientListService {
  // private url: string = environment.url + 'TrackForce/';
  private url: string = environment.msurl + '8090';

  constructor(private http: HttpClient) { }

  // get all Client objects
  getAllClients(): Observable<any> {
    // return this.http.get(this.url + 'clients'); // previously /info
    return this.http.get(this.url + '/all/client/');
  }

  /** Client Object by id
    *@param {number} clientId
    */
  getOneClient(clientId: number): Observable<any> {
    // return this.http.get(this.url + 'clients/' + clientId);
    return this.http.get(this.url + '/one/client/' + clientId);
  }

}
