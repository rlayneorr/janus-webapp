import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';
import { LocationService } from '../../../hydra-client/services/location/location.service';
import { Location } from '../../../hydra-client/entities/location-entities/Location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private jokeSubscription: Subscription;
  joke;

  constructor(private chuckNorrisService: ChuckNorrisService, private locationService: LocationService) { }

  ngOnInit() {
    this.jokeSubscription = this.chuckNorrisService.joke$.subscribe( (resp) => {
      this.joke = resp;
    });
    // test getLocationById, getBuildingById, getRoomById, getRoomsByBuildingId
    // this.locationService.getLocation(1); // this one currently works. get a specific location.
    // this.locationService.getBuilding(1);
    // this.locationService.getBuildingsByLocationId(1);
    // this.locationService.getOneRoom(1);
    // this.locationService.getRoomsByBuildingId(2);

    // test getAllLocations, getAllRooms, getAllBuildings, getAllUnavailabilities
    this.locationService.getAllLocations(); // This one currently works. get all locations
    this.locationService.getAllBuildings();
    this.locationService.getAllRooms();
    this.locationService.getAllUnavailabilities();

    // test save newLocation
    // tslint:disable-next-line:max-line-length
    const testLocation: Location = new Location(null, '5.2 test', 'Tampa', 'FL', 33637, 'usdfa', true);
    this.locationService.newLocation(testLocation); // this also works. create new location.

    // testing updateLocation, changing state of testLocation here for checking update
    testLocation.locationId = 77;
    testLocation.zip = 86754;
    console.log('Logging changes to testLocation:  ' + JSON.stringify(testLocation));
    this.locationService.updateLocation(testLocation); // this one is working now. updates an existing location

    // testing deleteLocation, changes state of record x to inactive
    // testLocation.locationId = 72;
    // this.locationService.deleteLocation(testLocation); // this one works now too. sets a specified location to ACTIVE=FALSE
  }

  newJoke() {
    this.chuckNorrisService.fetch();
  }

  // clean up subscriptions
  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }

}
