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
    // tslint:disable-next-line:max-line-length
    // this.locationService.newLocation(new Location(null, 'eatmyshorts', 'Los Angeles', 'CA', 3252, 'company', true)); // this also works. create new location.
    // this.locationService.getAllLocations(); // This one currently works. get all locations
    // this.locationService.getLocation(1); this one currently works. get a specific location.

    // buildsings
    // this.locationService.getAllBuildings(); works get all buildings
    // this.locationService.getBuildingsByLocationId(1); works get all buildings by location id.
    // this.locationService.getBuildingById(1); get one single building works.
    // this.locationService.newBuilding(new Building(null, 'new building', 1, 666)); // works. Creates a simple new building.

    // Rooms
    // this.locationService.newRoom(new Room(null, 232, 1, null, 23));
    // this.locationService.getAllRooms();
    // this.locationService.getOneRoom(1);
    // this.locationService.getRoomsByBuildingId(1);

  }

  newJoke() {
    this.chuckNorrisService.fetch();
  }

  // clean up subscriptions
  ngOnDestroy() {
    this.jokeSubscription.unsubscribe();
  }

}
