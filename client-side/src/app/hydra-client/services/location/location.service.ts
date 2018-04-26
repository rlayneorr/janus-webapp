import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Location } from '../../entities/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LocationService {
  private location = new BehaviorSubject<any>([]);
  publicLocation = this.location.asObservable();
  url: string;



  constructor(private httpClient: HttpClient) { }

  getLocation(request: any) {
    return this.httpClient.get<Location>(this.url);
  }
  newLocation(location: Location) {
    return this.httpClient.post<Location>(this.url, JSON.stringify(location));
  }
  updateLocation(location: Location) {
    return this.httpClient.post<Location>(this.url,  JSON.stringify(location));
  }
  deleteLocaiton(location: Location) {
    return this.httpClient.post<Location>(this.url,  JSON.stringify(location));
  }
}
