import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';
import { LocationService } from '../../../hydra-client/services/location/location.service';
import { Location } from '../../../hydra-client/entities/location-entities/Location';
import { Building } from '../../../hydra-client/entities/location-entities/Building';
import { Room } from '../../../hydra-client/entities/location-entities/Room';
import { Unavailability } from '../../../hydra-client/entities/location-entities/Unavailability';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private jokeSubscription: Subscription;
  private locations: Location[];
  joke;
  location: Location[];

  subscription: any;
  constructor(private chuckNorrisService: ChuckNorrisService, private locationService: LocationService) { }

  ngOnInit() {
    this.jokeSubscription = this.chuckNorrisService.joke$.subscribe( (resp) => {
      this.joke = resp;
    });
    // test getLocationById, getBuildingById, getRoomById, getRoomsByBuildingId; these 5 currently work
    // this.locationService.getLocation(1);
    // this.locationService.getBuildingById(1);
    // this.locationService.getRoomById(1);
    // this.locationService.getBuildingsByLocationId(1);
    // this.locationService.getRoomsByBuildingId(2);

    // test getAllLocations, getAllRooms, getAllBuildings, getAllUnavailabilies; these 4 currently work
    // this.locationService.getAllLocations();
    // this.locationService.getAllBuildings();
    // this.locationService.getAllRooms();
    // this.locationService.getAllUnavailabilities();

    // test save newLocation
    // const testLocation: Location = new Location(null, '5.2 test', 'Tampa', 'FL', 33637, 'usdfa', true);
    // console.log('Initializing testLocation:  ' + JSON.stringify(testLocation));
    // this.locationService.newLocation(testLocation); // this also works; creates a new location

    // test save with newBuilding
    // const testBuilding: Building = new Building(null, '123 Fake St', 1, 14);
    // console.log('Initializing testBuilding:  ' + JSON.stringify(testBuilding));
    // this.locationService.newBuilding(testBuilding);

    // test save with newRoom
    // const testRoom: Room = new Room(null, '300B', 2, 50);
    // console.log('Initializing testRoom:  ' + JSON.stringify(testRoom)); // this works; creates a new room
    // this.locationService.newRoom(testRoom);

    // test save with newUnavailability
    // const testUnavailability: Unavailability = new Unavailability(null, '1525291551', '1525291551', 'closed for maintenance', 1803, 4);
    // console.log('Initializing testUnavailability:  ' + JSON.stringify(testUnavailability));
    // this.locationService.newUnavailability(testUnavailability);

    // testing updateLocation, updateRoom, updateBuilding
    // testLocation.locationId = 3;
    // testLocation.zip = 86754;
    // console.log('Logging changes to testLocation:  ' + JSON.stringify(testLocation));
    // this.locationService.updateLocation(testLocation); // this one is working now. updates an existing location
    // testRoom.roomId = 15;
    // testRoom.capacity = 666;
    // console.log('Logging changes to testRoom:  ' + JSON.stringify(testRoom));
    // this.locationService.updateRoom(testRoom); // this one works too. updates an existing room
    // testBuilding.streetAddress = '1234 FakeTestUpdate Lane';
    // testBuilding.buildingNumber = 666;
    // testBuilding.buildingId = 20;
    // console.log('Logging changes to testBuilding:  ' + JSON.stringify(testBuilding));
    // this.locationService.updateBuilding(testBuilding);

    // testing deleteLocation; changes state of record x to inactive
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
