import { TestBed, inject, async } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';
import { Subscription } from 'rxjs/Subscription';
import { Building } from '../../entities/location-entities/Building';
import { Room } from '../../entities/location-entities/Room';
import { Unavailability } from '../../entities/location-entities/Unavailability';



describe('LocationService', () => {

  beforeAll(() => {
  });

  beforeEach((done) => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        UrlService],
      imports: [HttpClientModule]
    });
    done();
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));

  it('should get a list of locations from the backend', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Location[];

     service.getAllLocations().subscribe((results) => {

      data = results;
      expect(data).toBeDefined();
    });
  })));
  it('should get a location by id', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Location;
    service.getLocationById(1).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should create a new location', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Location;
    service.newLocation(new Location(null, 'new street', 'houston', 'tx', '77066', 'Revature', true)).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should update a location', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Location;
    service.updateLocation(new Location(1, 'update', 'houston', 'tx', '77066', 'Revature', true)).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should set a location as false', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Location;
    service.deleteLocation(new Location(2, 'update', 'houston', 'tx', '77066', 'Revature', false)).subscribe((results) => {

      data = results;

      expect(data.active).toBeFalsy();
    });
  })));
  it('should get all buildings', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Building[];
    service.getAllBuildings().subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get buildings by a location', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Building[];
    service.getBuildingsByLocationId(1).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get building by id', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Building;
    service.getBuildingById(1).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should create new building', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Building;
    service.newBuilding(new Building(null, 'new Building', 2, '200B')).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should update building', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Building;
    service.updateBuilding(new Building(1, 'new Building', 1, '200B')).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get entire rooms', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room[];
    service.getAllRooms().subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get room by building id', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room[];
    service.getRoomsByBuildingId(1).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get rooms by location id', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room[];
    service.getRoomsByLocationId(1).subscribe((results) => {

      data = results;
      console.log(data);
      expect(data).toBeDefined();
    });
  })));
  it('should get room by id', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room;
    service.getRoomById(1).subscribe((results) => {

      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should create new room', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room;
    service.newRoom(new Room(null, '2352BA', 1, 50)).subscribe((results) => {
      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should update a room', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Room;
    service.updateRoom(new Room(2, '101-A/G-Mitch Room', 1, 100)).subscribe((results) => {
      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should get all unavailabilities', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Unavailability[];
    service.getAllUnavailabilities().subscribe((results) => {
      data = results;

      expect(data).toBeDefined();
    });
  })));
  it('should post an unavailability', async( inject([LocationService], (service: LocationService) => {
    // tslint:disable-next-line:prefer-const
    let data: Unavailability;
    service.newUnavailability(new Unavailability(null, 1525406400000, 1525406400000, 'replacing things', 2, 1)).subscribe((results) => {
      data = results;
      expect(data).toBeDefined();
    });
  })));

});

