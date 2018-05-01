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

  it('should get a list of locations from the backend', inject([LocationService], async (service: LocationService) => {
    let data: Location[];
    service.getAllLocations();
    service.publicLocations.subscribe((result) => {
      data = result;
      console.log(data);
    });
    expect(data[0].active).toBeFalsy();
  }));

  xit('should get one location from the backend', inject([LocationService], async (service: LocationService, done) => {
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
