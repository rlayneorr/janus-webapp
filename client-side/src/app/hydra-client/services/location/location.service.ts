import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../../entities/location-entities/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../urls/url.service';
import { Building } from '../../entities/location-entities/Building';
import { Room } from '../../entities/location-entities/Room';
import { Unavailability } from '../../entities/location-entities/Unavailability';
import { from } from 'rxjs/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';
import { Observable } from 'rxjs/Observable';


@Injectable()
/**
 * The Location Service provides methods for other elements to access data related
 * to the geographical locations used by trainers and batches -- locations,
 * buildings, and rooms.
 * @author Luis Muñoz
 * @author Lex Gospodinoff
 * @author Tanhim Ahmed
 */
export class LocationService {

  header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8;');

  listSubject: BehaviorSubject<Location[]>;

  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) {
    this.listSubject = new BehaviorSubject([]);
    this.initializeSubscriptions();

  }
  private initializeSubscriptions(): void {

  }

  // Methods for locations
  /**Sends an HTTP request to the location service backend, and returns an observable
   * of an array of all locations. */
  getAllLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.urls.location.getAllLocations());
  }
  /**Takes a locationId (number) and returns an observable of that location object
   * from the database. */
  getLocationById(location: any) {
    return this.httpClient.get<Location>(this.urls.location.getLocationById(location));
  }
  /**Takes a location object and creates a new location in the database using that data.
   * Returns an observable of the new location returned from the database. */
  newLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location), {headers: this.header});
  }
  /**Takes a location object, including the locationId field, and updates the database
   * location with that ID with the data in the location object. Returns an observable
   * of the updated location object from the database. */
  updateLocation(location: Location) {
    return this.httpClient.put<Location>(this.urls.location.putLocationById(location.locationId),
      JSON.stringify(location), {headers: this.header});
  }
  /**Takes a location object, including a locationId. Sets the location corresponding to
   * that ID to be inactive in the database, such that it will no longer be returned
   * in searches. Returns an observable of the deactivated location object from the database. */
  deleteLocation(location: Location) {
    return this.httpClient.delete<Location>(this.urls.location.deleteLocationById(location.locationId));
  }



  // Methods for buildings
  /**Sends an HTTP request to the backend, and returns an observable of an array of all
   * buildings in the database, regardless of location. */
  getAllBuildings() {
    return this.httpClient.get<Array<Building>>(this.urls.building.getAllBuildings());
  }
  /**Takes a locationId (number) and returns an observable of an array of all buildings present
   * at that location. */
  getBuildingsByLocationId(locationId: any) {
    return this.httpClient.get<Array<Building>>(this.urls.building.getBuildingsByLocationId(locationId));
  }
  /**Takes a buildingId (number) and returns an observable of that building from the database. */
  getBuildingById(buildingId: any) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(buildingId));
  }
  /**Takes a building object and creates a new building in the database using that data.
   * Returns an observable of the new building from the database. */
  newBuilding(building: Building) {
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building), {headers: this.header});
  }
  /**Takes a building object, including the buildingId field, and updates the database
   * building with that ID with the data in the building object. Returns an observable
   * of the updated building object from the database. */
  updateBuilding(building: Building) {
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId),
      JSON.stringify(building), {headers: this.header});
  }


  // Methods for rooms
  /**Sends an HTTP request to the backend, and returns an observable of an array of
   * all rooms, regardless of building or location. */
  getAllRooms() {
    return this.httpClient.get<Array<Room>>(this.urls.room.getAllRooms());
  }
  /**Takes a buildingId (number) and returns an observable of
   * an array of all rooms belonging to that building. */
  getRoomsByBuildingId(buildingId: any) {
    return this.httpClient.get<Array<Room>>(this.urls.room.getRoomsByBuildingId(buildingId));
  }
  /**Takes a roomId (number) and returns an observable of that room object from the database. */
  getRoomById(room: any) {
    return this.httpClient.get<Room>(this.urls.room.getRoomById(room));
  }
  /**Function for getting all rooms in a given location
   * using multiple AJAX calls. Takes in a locationId (number)
   * and returns an observable of an array of rooms. */
  getRoomsByLocationId(locationId: number) {
    return this.getBuildingsByLocationId(locationId)
      .mergeMap((buildingArray: Building[]) => {
        return this.getRoomsFromBuildings(buildingArray);
    });
  }
  /**Helper method for the above. */
  private getRoomsFromBuildings(buildsArray: Array<Building>) {
    let roomsObserve = from(new Array<Array<Room>>());
    buildsArray.forEach((building) => {
      roomsObserve = roomsObserve.merge(this.getRoomsByBuildingId(building.buildingId));
    });
    return roomsObserve;
  }
  // /**This method can be swapped in for the above in conjunction with backend functionality
  //  * in order to provide an alternate implementation that uses fewer AJAX calls. */
  // getRoomsByLocationId(locationId: any) {
  //   return this.httpClient.get<Array<Room>>(this.urls.room.getRoomsByLocationId(locationId));
  // }
  /**Takes a room object and creates a new room in the database using that data. Returns an
   * observable of the new room from the database. */
  newRoom(room: Room) {
    return this.httpClient.post<Room>(this.urls.room.postRoom(), JSON.stringify(room), {headers: this.header});
  }
  /**Takes a room object, including the roomId, and updates the database object with that
   * roomId using the information in the room object. Returns an observable of the updated
   * room from the database. */
  updateRoom(room: Room) {
    return this.httpClient.put<Room>(this.urls.room.putRoomById(room.roomId), JSON.stringify(room),
      {headers: this.header});
  }


  /**Makes an HTTP request to the location service backend, returning an observable of an
   * array of all unavailabilities in the database. */
  getAllUnavailabilities() {
    return this.httpClient.get<Array<Unavailability>>(this.urls.unavailability.getAllUnavailabilities());
  }
  /**Takes an unavailability object and creates a new unavailability in the database using
   * that data. Returns an observable of the new unavailability from the database. */
  newUnavailability(unavailability: any) {
    return this.httpClient.post<Unavailability>(this.urls.unavailability.postUnavailability(),
      JSON.stringify(unavailability), {headers: this.header});
  }
}
