import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

// services
import { environment } from '../../../environments/environment';
import { AlertsService } from './alerts.service';

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

  constructor(private http: HttpClient,
    private alertService: AlertsService) { }

  /**
   * used to get all locations from
   * database and populate the data subject
   *
   */
  getAll() {
    this.http.get<Location[]>(environment.getAllLocations).subscribe((resp) => {
      this.alertService.success('Got all locations successfully!');
      this.dataSubject.next(resp);
    },
      (err) => {
        this.alertService.error('Failed to get all locations!');
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
      this.alertService.success('Location saved successfully!');
      this.getAll();
    },
      (err) => {
        this.alertService.error('Location failed to save!');
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
      this.alertService.success('Location saved successfully!');
      this.getAll();
    },
      (err) => {
        this.alertService.error('Location failed to save!');
      });
  }

  deleteLocation(location: Location) {
    location.active = false;
    this.http.request('delete', environment.deleteLocation,
      {
        withCredentials: true,
        body: location
      })
      .subscribe(
      resp => {
        this.alertService.success('Location deactivated successfully!');
      },
      err => {
        this.alertService.error('Location failed to deactivate!');
      }
      );
  }

  reactivateLocation(location: Location) {
    location.active = true;
    this.http.request('put', environment.reactivateLocation,
      {
        withCredentials: true,
        body: location
      })
      .subscribe(
      resp => {
        this.alertService.success('Location reactivated successfully!');
      },
      err => {
        this.alertService.error('Location failed to reactivate!');
      }
      );
  }
}
