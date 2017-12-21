import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Location } from '../../entities/Location';

@Injectable()
export class LocationService {

  private dataSubject = new BehaviorSubject([]);

  trainers$: Observable<any> = this.dataSubject.asObservable(); // this is how components should access the data if you want to cache it

  constructor(@Inject(Http) public http: Http) {
  }

  deleteLocation(location: Location) {
    location.active = false;

    this.http.delete(environment.context + '/vp/location/delete',
    {withCredentials: true, body: location}).map(
        resp => resp.json(),
    )
    .subscribe(
        resp => {
          },
          err => {
            // handle the error however you want
          }
    );
  }
}
