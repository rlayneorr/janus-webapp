import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';
import { LocationService } from '../../../hydra-client/services/location/location.service';
import { Location } from '../../../hydra-client/entities/location-entities/Location';
import { Building } from '../../../hydra-client/entities/location-entities/Building';
import { Room } from '../../../hydra-client/entities/location-entities/Room';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private jokeSubscription: Subscription;
  private locations: Location[];
  joke;

  subscription: any;
  constructor(private chuckNorrisService: ChuckNorrisService, private locationService: LocationService) { }

  ngOnInit() {
    this.jokeSubscription = this.chuckNorrisService.joke$.subscribe( (resp) => {
      this.joke = resp;
    });
    // test getLocationById
    this.locationService.getLocation(1); // this one currently works. get a specific location.
    // test getAllLocations
    this.locationService.getAllLocations(); // This one currently works. get all locations

    // test save newLocation
    // tslint:disable-next-line:max-line-length
    const testLocation: Location = new Location(null, 'a new test', 'New York', 'NY', 11011, 'usdfa', true);
    this.locationService.newLocation(testLocation); // this also works. create new location.

    // testing updateLocation, changing state of testLocation here for checking update
    testLocation.locationId = 9;
    testLocation.zip = 99999;
    console.log('Logging changes to testLocation:  ' + JSON.stringify(testLocation));
    this.locationService.updateLocation(testLocation); // this one is still testing. updates an existing location

  }

  newJoke() {
    this.chuckNorrisService.fetch();
  }

  // clean up subscriptions
  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }

}
