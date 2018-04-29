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

  private building = new BehaviorSubject<any>([]);
  publicBuilding = this.building.asObservable();

  private buildings = new BehaviorSubject<any>([]);
  publicBuildings = this.buildings.asObservable();

  private room = new BehaviorSubject<any>([]);
  publicRoom = this.room.asObservable();

  private rooms = new BehaviorSubject<any>([]);
  publicRooms = this.rooms.asObservable();

  header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8;');


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
        console.log(payload);
      }
    );
  }
  // set new Location //
  newLocation(location: any) {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8;' );
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location), {headers: header}).subscribe(
      (payload) => {
        console.log(payload);
      }
    );
  }
  // update the location //
  updateLocation(location: any) {
    return this.httpClient.post<Location>(this.urls.location.putLocationById(location.locationId), JSON.stringify(location));
  }
  // set location as inactive //
  deleteLocation(location: any) {
    return this.httpClient.post<Location>(this.urls.location.deleteLocationById(location.locationId), JSON.stringify(location));
  }

  // Get all Buildings. This one is independent from Locations.
  getAllBuildings() {
    return this.httpClient.get<Array<Building>>(this.urls.building.getAllBuildings()).subscribe((payload) => {
      console.log(payload);
      this.buildings.next(payload);
    });
  }
  // Get all buildings by Location ID. this one is dependent on a location's Id.
  getBuildingsByLocationId(locationId: any) {
    return this.httpClient.get<Array<Building>>(this.urls.building.getBuildingsByLocationId(locationId)).subscribe((payload) => {
      console.log(payload);
      this.buildings.next(payload);
    });
  }
  // Returns a singular location by its ID. This has no corelation with locations.
  getBuildingById(buildingId: any) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(buildingId)).subscribe((payload) => {
      console.log(payload);
      this.building.next(payload);
    });
  }

  // Basic create building request.
  newBuilding(building: Building) {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8;' );
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building), {headers: header})
    .subscribe((payload) => {
    console.log(payload);
    this.building.next(payload);
    });
  }
  // update Building //
  updateBuilding(building: Building) {
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8;' );
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId),
    JSON.stringify(building), {headers: header}).subscribe(
      (payload) => {
        this.buildings.next(payload);
      }
    );
  }
  // set Building as inactive //
  deleteBuilding(building: Building) {
    return this.httpClient.delete<Building>(this.urls.building.deleteBuildingById(building.buildingId)).subscribe(
      (payload) => {
        this.building.next(payload);
      }
    );
  }


  // get all Rooms //
  getAllRooms() {
    return this.httpClient.get<Array<Room>>(this.urls.room.getAllRooms()).subscribe(
      (payload) => {
        this.rooms.next(payload);
        console.log(payload);
      }
    );
  }
  // get Room by Id //
  getOneRoom(room: Room) {
    return this.httpClient.get<Room>(this.urls.room.getRoomById(room.roomId)).subscribe(
      (payload) => {
        this.room.next(payload);
        console.log(payload);

      }
    );
  }
  // set new Room //
  newRoom(room: Room) {
    return this.httpClient.post<Room>(this.urls.room.postRoom(), JSON.stringify(room), {headers: this.header}).subscribe(
      (payload) => {
        this.room.next(payload);
        console.log(payload);

      }
    );
  }
  // update Room //
  updateRoom(room: Room) {
    return this.httpClient.put<Room>(this.urls.room.putRoomById(room.roomId), JSON.stringify(room), {headers: this.header}).subscribe(
      (payload) => {
        this.room.next(payload);
        console.log(payload);

      }
    );
  }
  // set Room as inactive //
  deleteRoom(room: Room) {
    return this.httpClient.delete<Room>(this.urls.room.deleteRoomById(room.roomId)).subscribe(
      (payload) => {
        this.room.next(payload);
        console.log(payload);

      }
    );
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
