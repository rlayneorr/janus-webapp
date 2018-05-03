import { TestBed, inject, async } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UrlService } from '../urls/url.service';
import { Location } from '../../entities/location-entities/Location';





// const testLoc = new Location(1, null, null, null, 0, null, false);
// const retry = require('promise-retry');



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

  // these do not work as tests
  // fit('should get a list of locations from the backend', inject([LocationService], async (service: LocationService, done) => {
  //   let data: Location[];
  //   service.getAllLocations();
  //   await service.publicLocations.subscribe((result) => {
  //     data = result;
  //     console.log(data);
  //   });
  //   setTimeout(() => {
  //     console.log(data);
  //     expect(data[0].active).toBeDefined();
  //     expect(data[0].active).toBeUndefined();
  //     done();
  //   }, 2000);
  // }));

  // it('should get one location from the backend', inject([LocationService], async (service: LocationService, done) => {
  //   let data: Location;
  //   const i = 1;
  //   await service.getLocation(i);
  //   await retry service.publicLocation.subscribe((result) => {
  //     data = result;
  //   });
  //   done();
  //   expect(data.locationId).toBe(i);
  // }));

  // it('should get one location from the backend', inject([LocationService], (service: LocationService) => {
  //   const i = 1;
  //   service.getLocation(i);

  //   function callOneLocation() {
  //     const deferred = protractor.promise.defer();
  //     service.publicLocation.subscribe((payload) => {
  //       deferred.fulfill(payload);
  //     }, (error) => {
  //       deferred.reject({ error : error });
  //     });
  //     return deferred.promise;
  //   }

  //   const flow = new protractor.promise.ControlFlow();
  //   flow.execute(callOneLocation);
  //   expect(protractor.promise.defer).toHaveBeenCalled();

  // }));

  it('should get a location from the backend', async(inject([LocationService], async (done, service: LocationService) => {
    let data: Location;
    const i = 1;
    await service.getLocation(i);
    await service.publicLocation.elementAt(1).subscribe(async (result) => {
      data = result;
    }, (error) => {
      console.log('there was an error');
    });
    await expect(data).toBeUndefined();
  })));

});
