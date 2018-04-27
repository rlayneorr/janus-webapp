import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../entities/location-entities/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UrlService } from '../urls/url.service';
import { Building } from '../../entities/location-entities/Building';


@Injectable()
export class LocationService {
  private location = new BehaviorSubject<any>([]);
  publicLocation = this.location.asObservable();
  urlLiteral: string;

  // Injecting UrlService and HttpClient into LocationService constructor //
  constructor(private httpClient: HttpClient, private urls: UrlService) { }

  // Get all Locations.
  getAllLocations() {
    return this.httpClient.get<Location>(this.urls.location.getAllLocations());
  }
  // Get Location by Id
  getLocation(location: Location) {
    return this.httpClient.get<Location>(this.urls.location.getLocationById(location.locationId));
  }
  // Set new Location
  newLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.postLocation(), JSON.stringify(location));
  }
  // Update the location.
  updateLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.putLocationById(location.locationId), JSON.stringify(location));
  }
  // set location as inactive.
  deleteLocation(location: Location) {
    return this.httpClient.post<Location>(this.urls.location.deleteLocationById(location.locationId), JSON.stringify(location));
  }

  getAllBuildings() {
    return this.httpClient.get<Building>(this.urls.building.getAllBuildings());
  }
  getOneBuilding(building: Building) {
    return this.httpClient.get<Building>(this.urls.building.getBuildingById(building.buildingId));
  }
  newBuilding(building: Building) {
    return this.httpClient.post<Building>(this.urls.building.postBuilding(), JSON.stringify(building));
  }
  updateBuilding(building: Building) {
    return this.httpClient.put<Building>(this.urls.building.putBuildingById(building.buildingId), JSON.stringify(building));
  }
  deleteBuilding(building: Building) {
    return this.httpClient.delete<Building>(this.urls.building.deleteBuildingById(building.buildingId));
  }
}
