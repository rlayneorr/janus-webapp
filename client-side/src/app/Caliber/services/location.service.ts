import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../environments/environment';

// entities
import { Location } from '../../entities/Location';

/**
 * this service is used to make API calls
 * to for the location component
 *
 */
@Injectable()
export class LocationService {

  private dataSubject = new BehaviorSubject([]);

  locations$: Observable<any> = this.dataSubject.asObservable(); // this is how components should access the data if you want to cache it

  constructor(private http: HttpClient) { }

  /**
   * used to get all locations from
   * database and populate the data subject
   *
   */
  getAll() {
    this.http.get<Location[]>(environment.getAllLocations).subscribe((resp) => {
      console.log('got all locations');
      this.dataSubject.next(resp);
    },
      (err) => {
        console.log('error fetching all locations');
      });
  }

  /**
   * used to add a new location to the database
   * and retrieve all new locations from subject
   *
   * @param location
   */
  addLocation(location: Location) {
    this.http.post(environment.addLocation, location).subscribe((resp) => {
      console.log('added a location');
      this.getAll();
    },
      (err) => {
        console.log('error adding location');
      });
  }

  /**
   * used to update the location in the database
   * and retrieves the list of locations from
   * the subject
   *
   * @param location
   */
  updateLocation(location: Location) {
    this.http.put(environment.editLocation, location).subscribe((resp) => {
      console.log('edited a location');
      this.getAll();
    },
      (err) => {
        console.log('error editing location');
      });
  }

  // deleteLocation(location: Location) {
  //   location.active = false;
  //   this.http.delete(environment.deleteLocation, { withCredentials: true, body: location })
  //     .subscribe(
  //     resp => {
  //     },
  //     err => {
  //       // handle the error however you want
  //     }
  //     );
  // }
}
