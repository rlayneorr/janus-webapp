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

  private room = new BehaviorSubject<any>([]);
  publicRoom = this.room.asObservable();

  private rooms = new BehaviorSubject<any>([]);
  publicRooms = this.room.asObservable();

  header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8;');


  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) { }

  // get all Locations //
  getAllLocations() {
    return this.httpClient.get<Location>(this.urls.location.getAllLocations()).subscribe(
      (payload) => {
        this.location.next(payload);
        console.log(payload);
      }
    );
  }
  // Get Location by Id
  getLocation(location: any) {
    return this.httpClient.get<Location>(this.urls.location.getLocationById(location)).subscribe(
      (payload) => {
        this.location.next(payload);
        console.log(payload);
      }
    );
  }
  // Set new Location
  newLocation(location: any) {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8;' );
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location), {headers: header}).subscribe(
      (payload) => {
        console.log(payload);
      }
    );
  }
  // Update the location.
  updateLocation(location: any) {
    return this.httpClient.post<Location>(this.urls.location.putLocationById(location.locationId), JSON.stringify(location));
  }
  // set location as inactive //
  deleteLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.deleteLocationById(location.locationId), JSON.stringify(location));
  }
  // get all Buildings //
  getAllBuildings() {
    return this.httpClient.get<Building>(this.urls.building.getAllBuildings());
  }
  // get Building by Id //
  getOneBuilding(building: Building) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(building.buildingId));
  }
  // set new Building //
  newBuilding(building: Building) {
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building));
  }
  // update Building //
  updateBuilding(building: Building) {
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId), JSON.stringify(building));
  }
  // set Building as inactive //
  deleteBuilding(building: Building) {
    return this.httpClient.delete<Building>(this.urls.building.deleteBuildingById(building.buildingId));
  }


  getAllRooms() {
    return this.httpClient.get<Array<Room>>(this.urls.room.getAllRooms()).subscribe(
      (payload) => {
        this.rooms.next(payload);
      }
    );
  }
  getOneRoom(room: Room) {
    return this.httpClient.get<Room>(this.urls.room.getRoomById(room.roomId)).subscribe(
      (payload) => {
        this.room.next(payload);
      }
    );
  }
  newRoom(room: Room) {
    return this.httpClient.post<Room>(this.urls.room.postRoom(), JSON.stringify(room), {headers: this.header}).subscribe(
      (payload) => {
        this.room.next(payload);
      }
    );
  }
  updateRoom(room: Room) {
    return this.httpClient.put<Room>(this.urls.room.putRoomById(room.roomId), JSON.stringify(room), {headers: this.header}).subscribe(
      (payload) => {
        this.room.next(payload);
      }
    );
  }
  deleteRoom(room: Room) {
    return this.httpClient.delete<Room>(this.urls.room.deleteRoomById(room.roomId), {headers: this.header}).subscribe(
      (payload) => {
        this.room.next(payload);
      }
    );
  }

  // Get all unavailabilities.
  getUnavailabilities() {
    return this.httpClient.get<Unavailability>(this.urls.unavailability.getAllUnavailabilities());
  }
}
