import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';

const exp = {
  location: JSON.parse(`{"locationId": 1, "street": "102 bluh ave", "city": "Lutz",
  "state": "fl", "zip": null, "company": null, "active": true }`)
};

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

  it('should get data from the backend', inject([LocationService], (service: LocationService) => {
    let data: Location;
    service.getAllLocations().subscribe((result) => {
      data = result;
    });
    expect(data).toBe([exp.location]);
  }));

});
