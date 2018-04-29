import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '../../entities/location-entities/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../urls/url.service';
import { Building } from '../../entities/location-entities/Building';
import { Room } from '../../entities/location-entities/Room';
import { Unavailability } from '../../entities/location-entities/Unavailability';


@Injectable()
export class LocationService {
  private location = new BehaviorSubject<any>([]);
  publicLocation = this.location.asObservable();
  changeLocation: Location;

  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) { }

  // get all Locations //
  getAllLocations() {
    return this.httpClient.get<Location[]>(this.urls.location.getAllLocations()).subscribe(
      (payload) => {
        this.location.next(payload);
        console.log(payload);
      }
    );
  }
  // get Location by Id //
  getLocation(location: any) {
    return this.httpClient.get<Location>(this.urls.location.getLocationById(location)).subscribe(
      (payload) => {
        this.location.next(payload);
        this.changeLocation = payload;
        console.log(payload);
      }
    );
  }
  // set new Location //
  newLocation(location: Location) {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8;' );
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location), {headers: header}).subscribe(
      (payload) => {
        console.log(payload);
      }
    );
  }
  // update the location //
  updateLocation(location: Location) {
    let header = new HttpHeaders();
    // getting the record from the database that should be updated //
    this.getLocation(location.locationId);
    console.log('From update service' + JSON.stringify(this.changeLocation));
    // logging the retrieved record that should be updated //
    header = header.set('Content-Type', 'application/json; charset=utf-8;');
    return this.httpClient.put<Location>(this.urls.location.putLocationById(location.locationId), JSON.stringify(location),
                                          {headers: header}).subscribe(
                                            (payload) => {
                                              console.log('this is payload');
                                              console.log(payload);
                                            }
                                          ); // recompile
  }
  // set location as inactive //
  deleteLocation(location: any) {
    return this.httpClient.post<Location>(this.urls.location.deleteLocationById(location.locationId), JSON.stringify(location));
  }

  // get all Buildings //
  getAllBuildings() {
    return this.httpClient.get<Building[]>(this.urls.building.getAllBuildings());
  }
  // get Building by Id //
  getOneBuilding(building: any) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(building.buildingId));
  }
  // set new Building //
  newBuilding(building: any) {
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building));
  }
  // update Building //
  updateBuilding(building: any) {
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId), JSON.stringify(building));
  }
  // set Building as inactive //
  deleteBuilding(building: any) {
    return this.httpClient.delete<Building>(this.urls.building.deleteBuildingById(building.buildingId));
  }

  // get all Rooms //
  getAllRooms() {
    return this.httpClient.get<Room[]>(this.urls.room.getAllRooms());
  }
  // get Room by Id //
  getOneRoom(room: any) {
    return this.httpClient.get<Room>(this.urls.room.getRoomById(room.roomId));
  }
  // set new Room //
  newRoom(room: any) {
    return this.httpClient.post<Room>(this.urls.room.postRoom(), JSON.stringify(room));
  }
  // update Room //
  updateRoom(room: any) {
    return this.httpClient.put<Room>(this.urls.room.putRoomById(room.roomId), JSON.stringify(room));
  }
  // set Room as inactive //
  deleteRoom(room: any) {
    return this.httpClient.delete<Room>(this.urls.room.deleteRoomById(room.roomId));
  }

  // get all Unavailabilities //
  getAllUnavailabilities() {
    return this.httpClient.get<Unavailability[]>(this.urls.unavailability.getAllUnavailabilities());
  }
  // get Unavailability by Id //
  getOneUnavailability(unavailability: any) {
    return this.httpClient.post<Unavailability>(this.urls.unavailability.postUnavailability(), JSON.stringify(unavailability));
  }
}
