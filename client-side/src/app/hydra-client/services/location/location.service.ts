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

  header = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8;');

  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) { }

  // get all Locations //
  getAllLocations() {
    return this.httpClient.get<Location[]>(this.urls.location.getAllLocations());
  }

  // get Location by Id //
  getLocationById(location: any) {
    return this.httpClient.get<Location>(this.urls.location.getLocationById(location));
  }
  // set new Location //
  newLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location), {headers: this.header});
  }
  // update the location //
  updateLocation(location: Location) {
    return this.httpClient.put<Location>(this.urls.location.putLocationById(location.locationId),
      JSON.stringify(location), {headers: this.header});
  }
  // set location as inactive //
  deleteLocation(location: Location) {
    return this.httpClient.delete<Location>(this.urls.location.deleteLocationById(location.locationId));
  }

  // Get all Buildings. This one is independent from Locations.
  getAllBuildings() {
    return this.httpClient.get<Array<Building>>(this.urls.building.getAllBuildings());
  }
  // Get all buildings by Location ID. This is dependent on a location's Id //
  getBuildingsByLocationId(locationId: any) {
    return this.httpClient.get<Array<Building>>(this.urls.building.getBuildingsByLocationId(locationId));
  }
  // Returns a singular location by its ID. This has no corelation with locations //
  getBuildingById(buildingId: any) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(buildingId));
  }
  // set new Building //
  newBuilding(building: Building) {
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building), {headers: this.header});
  }
  // update Building //
  updateBuilding(building: Building) {
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId),
      JSON.stringify(building), {headers: this.header});
  }
  // // set Building as inactive //
  // deleteBuilding(building: Building) {
  //   return this.httpClient.delete<Building>(this.urls.building.deleteBuildingById(building.buildingId)).subscribe(
  //     (payload) => {
  //       // console.log('Logging deleteBuilding from service:  ' + JSON.stringify(payload));
  //       this.location.next(payload);
  //     }
  //   );
  // }


  // get all Rooms //
  getAllRooms() {
    return this.httpClient.get<Array<Room>>(this.urls.room.getAllRooms());
  }
  // get Room by Id //
  getRoomById(room: any) {
    return this.httpClient.get<Room>(this.urls.room.getRoomById(room));
  }
  // // get all Rooms in a Location //
  // getRoomsByLocationId(locationId: any) {
  //   return this.httpClient.get<Array<Room>>(this.urls.room.getRoomsByLocationId(locationId))
  //   .subscribe((payload) => {
  //     this.rooms.next(payload);
  //     console.log(payload);
  //   });
  // }
  // get all Rooms in a Building //
  getRoomsByBuildingId(buildingId: any) {
    return this.httpClient.get<Array<Room>>(this.urls.room.getRoomsByBuildingId(buildingId));
  }
  // set new Room //
  newRoom(room: Room) {
    return this.httpClient.post<Room>(this.urls.room.postRoom(), JSON.stringify(room), {headers: this.header});
  }
  // update Room //
  updateRoom(room: Room) {
    return this.httpClient.put<Room>(this.urls.room.putRoomById(room.roomId), JSON.stringify(room),
      {headers: this.header});
  }
  // // set Room as inactive //
  // deleteRoom(room: Room) {
  //   return this.httpClient.delete<Room>(this.urls.room.deleteRoomById(room.roomId)).subscribe(
  //     (payload) => {
  //       // console.log('Logging deleteRoom from service:  ' + JSON.stringify(payload));
  //       this.location.next(payload);
  //     }
  //   );
  // }


  // get all Unavailabilities //
  getAllUnavailabilities() {
    return this.httpClient.get<Array<Unavailability>>(this.urls.unavailability.getAllUnavailabilities());
  }
  // post Unavailability //
  newUnavailability(unavailability: any) {
    return this.httpClient.post<Unavailability>(this.urls.unavailability.postUnavailability(), JSON.stringify(unavailability),
      {headers: this.header});
  }
}
