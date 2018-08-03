import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';


/**
 * @author Han Jung
 * @description methods for grabbing data from api for client list
 */

@Injectable()
export class ClientListService {
  private url: string = (new UrlService).context + 'TrackForce/';
  // private url: string = environment.msurl + '8090';  import environment if your goingt to do what ever this weird thing does

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
