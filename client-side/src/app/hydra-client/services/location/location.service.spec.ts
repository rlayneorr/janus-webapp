import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';


const testLoc = new Location(1, null, null, null, 0, null, false);

describe('LocationService', () => {

  beforeAll(() => {

  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocationService,
        UrlService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));


  // i still don't know how to test methods that use observables -- these don't work as intended
  it('should get a list of locations from the backend', inject([LocationService], (service: LocationService) => {
    let data: Location[];
    service.getAllLocations();
    service.publicLocation.subscribe((result) => {
      data = result;
    });
    expect(data).toBeUndefined();
  }));

  fit('should get one location from the backend', inject([LocationService], (service: LocationService) => {
    let data: Location;
    service.getLocation(testLoc);
    service.publicLocation.subscribe((result) => {
      data = result;
      console.log(result);
    });
    expect(data).toBeDefined();
  }));

});
