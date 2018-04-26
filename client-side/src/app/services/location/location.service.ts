import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Location } from '../../entities/Location';


@Injectable()
export class LocationService {
  location: Location;
  url: string;

  constructor(private httpClient: HttpClient) { }

  getLocation(request: any) {
    return this.httpClient.get<Location>(this.url);
  }
  newLocation(location: Location) {
    return this.httpClient.post<Location>(this.url, location);
  }
  updateLocation(location: Location) {
    return this.httpClient.post<Location>(this.url, location);
  }
  deleteLocaiton(location: Location) {
    return this.httpClient.post<Location>(this.url, location);
  }
}
