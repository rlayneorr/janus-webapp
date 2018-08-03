import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

// services
import { AlertsService } from './alerts.service';

// Interfaces
import { CRUD } from '../interfaces/api.interface';

// entities
import { Location } from '../entities/Location';
import { UrlService } from '../../../gambit-client/services/urls/url.service';

const context = (new UrlService).location;
/**
 * This service is used to make API calls
 * for the location component
 */
@Injectable()
export class LocationService implements CRUD<Location> {

  listSubject: BehaviorSubject<Location[]>;

  /*
  * @deprecated
  *
  * Initial way used for components to access the returned
  * list BehaviorSubject as an obsevable
  *
  * -> retained for backwards compatibility
  *
  * you can also use the getList() method directly going forward
  */

  constructor(public http: HttpClient, alertService: AlertsService ) {
    // super(httpClient, alertService);
    this.listSubject = new BehaviorSubject([]);
    this.initializeSubscriptions();
  }

  /**
  * Bootstrap any subscriptions
  */
  private initializeSubscriptions(): void {}


  /*
  =====================
  BEGIN: API calls
  =====================
   */

  /**
   * Retrieves all Locations from the API
   * and pushed them on the listSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP', 'QC', 'TRAINER', 'STAGING', 'PANEL')")
   */
  public fetchAll(): Observable<Location[]> {
    this.http.get<any[]>(context.fetchAll()).subscribe((results) => this.listSubject.next(results));
    return this.listSubject.asObservable();
  }

  /**
   * Transmits a Location to be saved to
   * the API and pushes the saved Location
   * on the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param location: Location
   */
  public create(location: Location): Observable<Location> {
    return this.http.post<any>(context.save(), JSON.stringify(location));
  }

  /**
   * transmits a Location to be updated to
   * the API and pushes the updated Location
   * on the savedSubject
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param location: Location
   */
  public update(location: Location): Observable<Location> {
    return this.http.put<any>(context.update(), JSON.stringify(location));
  }

  /**
   * Transmits a Location to be deactivated
   * to the API and pushes the deactivated
   * location on the deletedSubject
   *
   * NOTE: there is no literal DELETE on the API
   *       it simply updates the object requiring the
   *       client to know to set the active flag to false
   *       in advance
   *
   *       this approach does the same thing while consuming
   *       the currently implemented methods
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param location: Location
   */
  public delete(location: Location): Observable<Location> {
    location.active = false;
    return this.http.put<any>(context.update(), JSON.stringify(location));
  }

  /**
   * Transmits a Location to be reactivated
   * to the API and pushes the reactivated
   * location on the updatedSubject
   *
   * NOTE: there is no literal DELETE on the API
   *       it simply updates the object requiring the
   *       client to know to set the active flag to false
   *       in advance
   *
   * spring-security: @PreAuthorize("hasAnyRole('VP')")
   *
   * @param location: Location
   */
  public reactivate(location: Location): Observable<Location> {
    location.active = true;
    return this.http.put<any>(context.update(), JSON.stringify(location));
  }

  /*
  * ============================================
  * BEGIN: deprecated functions
  *
  * -> retained for backwards compatibility
  * ============================================
  */

  /**
  * @deprecated
  *
  * @see fetchAll()
  *
  * convenience function for the fetchAll() method
  * retained to honor the initial design pattern
  * for components that may be dependent on it
  *
  * NOTE: not against "get" vs "fetch", same difference ultimately,
  * just keeping it consistent with access to the subjects
  * using the "get" convention and API calls using the "fetch"
  * convention for now
  */
  public getAll(): Observable<Location[]> {
    return this.fetchAll();
  }

  /**
  * @deprecated
  *
  * @see save();
  *
  * convenience function for the save() method
  * retained to honor the initial design path
  */
  public addLocation(location: Location): void {
    this.create(location);
  }

  /**
  * @deprecated
  *
  * @see update()
  *
  * convenience function for the update() method
  * retained to honor the initial design path
  */
  public updateLocation(location: Location): void {
    this.update(location);
  }

  /**
   * @deprecated
   *
   * @see reactivate()
   *
   * @param location
   */
  public reactivateLocation(location: Location) {
    this.reactivate(location);
  }

  /**
  * @deprecated
  *
  * @see delete()
  *
  * convenience function for the delete() method
  * retained to honor the initial design path
  */
  public deleteLocation(location: Location) {
    this.delete(location);
  }
}
