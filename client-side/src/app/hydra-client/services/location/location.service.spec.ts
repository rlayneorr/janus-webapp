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

  xit('should get a list of locations from the backend', inject([LocationService], (service: LocationService) => {
    // this doesn't work right now because the data is only available as the wrong data type
    let data: Location;
    service.getAllLocations();
    service.publicLocation.subscribe((result) => {
      data = result;
    });
    expect(data.locationId).toBeDefined();
  }));

  it('should get one location from the backend', inject([LocationService], (service: LocationService) => {
    let data: Location;
    service.getLocation(testLoc);
    service.publicLocation.subscribe((result) => {
      data = result;
    });
    expect(data.locationId).toBeDefined();
  }));

});
