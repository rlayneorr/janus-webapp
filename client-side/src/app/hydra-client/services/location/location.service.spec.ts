import { TestBed, inject } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';
import { Subscription } from 'rxjs/Subscription';

const testLoc = new Location(1, null, null, null, 0, null, false);


describe('LocationService', () => {

  beforeAll(() => {

  });
  afterAll((done) => {
    done();
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
    // tslint:disable-next-line:prefer-const
    let data: Location[];

    const get = await service.getAllLocations().then((results) => { console.log(results);
      data = results;
      expect(data).toBeFalsy();
    }).catch((err) => console.log(err));
    console.log(data[1]);
  }));

});
