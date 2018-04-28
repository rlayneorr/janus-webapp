import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';

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

  it('should get all locations', inject([LocationService], (service: LocationService) => {
    const expectedLocation = JSON.parse(`{"locationId": 1, "street": "102 bluh ave", "city": "Lutz",
    "state": "fl", "zip": null, "company": null, "active": true }`);
    let data;
    service.getAllLocations().subscribe((result) => {
      console.log(result);
      data = result;
    });
    expect(data).toBe(expectedLocation);
  }));

});
