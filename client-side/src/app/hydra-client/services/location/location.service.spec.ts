import { TestBed, inject, async } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';



// const testLoc = new Location(1, null, null, null, 0, null, false);

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

  // these work but throw 'unhandled promise rejection' errors
  fit('should get a list of locations from the backend', inject([LocationService], async (service: LocationService, done) => {
    let data: Location[];
    service.getAllLocations();
    await service.publicLocations.subscribe((result) => {
      data = result;
      console.log(data);
    });
    setTimeout(() => {
      console.log(data);
      expect(data[0].active).toBeDefined();
      expect(data[0].active).toBeUndefined();
      done();
    }, 2000);
  }));

  it('should get one location from the backend', inject([LocationService], async (service: LocationService, done) => {
    let data: Location;
    const i = 1;
    service.getLocation(i);
    service.publicLocation.subscribe((result) => {
      data = result;
    });
    done();
    expect(data.locationId).toBe(i);
  }));

});
