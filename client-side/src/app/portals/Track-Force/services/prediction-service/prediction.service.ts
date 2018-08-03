import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../../caliber-client/services/urls/url.service';

@Injectable()
export class PredictionService {
  private predictionPath = 'TrackForce/prediction/';

    /**
    * @constructor
    * @param {RequestService}
    * Service for handling all requests to the server
    */
    constructor(private http: HttpClient) {}

    private url = (new UrlService).context;

    public getPrediction(startTime: number, endTime: number, techs: any) {
      return this.http.get<any>(this.url + this.predictionPath + startTime + '/' + endTime);
    }
}
