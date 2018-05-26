import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';
import { LocationService } from '../../../gambit-client/services/location/location.service';
import { Location } from '../../../gambit-client/entities/location-entities/Location';
import { Building } from '../../../gambit-client/entities/location-entities/Building';
import { Room } from '../../../gambit-client/entities/location-entities/Room';
import { Unavailability } from '../../../gambit-client/entities/location-entities/Unavailability';


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
  }

  newJoke() {
    this.chuckNorrisService.fetch();
  }

  // clean up subscriptions
  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }

}
