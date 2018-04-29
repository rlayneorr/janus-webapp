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

    this.locationService.getLocation(1); // this one currently works. get a specific location.

    // tslint:disable-next-line:max-line-length
    this.locationService.newLocation(new Location(null, 'thisistheplace', 'Pittsburgh', 'PA', 15213, 'usdfa', true)); // this also works. create new location.
    this.locationService.getAllLocations(); // This one currently works. get all locations
  }

  newJoke() {
    this.chuckNorrisService.fetch();
  }

  // clean up subscriptions
  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }

}
