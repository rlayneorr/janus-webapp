import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Location } from '../../entities/location-entities/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../urls/url.service';


@Injectable()
export class LocationService {
  private location = new BehaviorSubject<any>([]);
  publicLocation = this.location.asObservable();
  urlLiteral: string;

  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) { }

  getLocation(request: any) {
    return this.httpClient.get<Location>(this.urlLiteral);
  }
  newLocation(location: Location) {
    const url = '';
    return this.httpClient.post<Location>(this.urlLiteral, JSON.stringify(location));
  }
  updateLocation(location: Location) {
    return this.httpClient.post<Location>(this.urlLiteral,  JSON.stringify(location));
  }
  deleteLocaiton(location: Location) {
    return this.httpClient.post<Location>(this.urlLiteral,  JSON.stringify(location));
  }
}
